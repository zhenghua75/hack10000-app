package cn.kmdx.hack10000;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Environment;
import android.provider.MediaStore;
import android.database.Cursor;
import android.util.Base64;
import android.app.AlertDialog;
import android.widget.ArrayAdapter;
import android.content.DialogInterface;
import android.graphics.BitmapFactory;
import android.graphics.Bitmap;
import android.media.ExifInterface;
import android.content.ComponentName;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.FileInputStream;
import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.util.List;
import java.util.ArrayList;
import java.io.FileOutputStream;
import java.util.UUID;
import java.net.URL;
import java.net.MalformedURLException;

import com.unionpay.UPPayAssistEx;
import org.json.JSONException;
import org.json.JSONObject;

import java.net.URLConnection;
import java.io.PrintWriter;  
import java.io.StringWriter;  
import com.unionpay.uppay.PayActivity;

public class UPPayModule extends ReactContextBaseJavaModule {

  private final ReactApplicationContext mReactContext;
  private final Activity mMainActivity;
  private final String mMode = "01";
  private static final String TN_URL_01 = "http://101.231.204.84:8091/sim/getacptn";

  public UPPayModule(ReactApplicationContext reactContext,Activity mainActivity) {
    super(reactContext);

    mReactContext = reactContext;
    mMainActivity = mainActivity;
  }

  @Override
  public String getName() {
    return "UPPay";
  }

  public void onActivityResult(int requestCode, int resultCode, Intent data) {
    /*************************************************
     * 步骤3：处理银联手机支付控件返回的支付结果
     ************************************************/
    if (data == null) {
        return;
    }

    String msg = "";
    /*
     * 支付控件返回字符串:success、fail、cancel 分别代表支付成功，支付失败，支付取消
     */
    String str = data.getExtras().getString("pay_result");
    if (str.equalsIgnoreCase("success")) {
        // 支付成功后，extra中如果存在result_data，取出校验
        // result_data结构见c）result_data参数说明
        if (data.hasExtra("result_data")) {
            String result = data.getExtras().getString("result_data");
            try {
                JSONObject resultJson = new JSONObject(result);
                String sign = resultJson.getString("sign");
                String dataOrg = resultJson.getString("data");
                // 验签证书同后台验签证书
                // 此处的verify，商户需送去商户后台做验签
                boolean ret = RSAUtil.verify(dataOrg, sign, mMode);
                if (ret) {
                    // 验证通过后，显示支付结果
                    msg = "支付成功！";
                } else {
                    // 验证不通过后的处理
                    // 建议通过商户后台查询支付结果
                    msg = "支付失败！";
                }
            } catch (JSONException e) {
            }
        } else {
            // 未收到签名信息
            // 建议通过商户后台查询支付结果
            msg = "支付成功！";
        }
    } else if (str.equalsIgnoreCase("fail")) {
        msg = "支付失败！";
    } else if (str.equalsIgnoreCase("cancel")) {
        msg = "用户取消了支付";
    }

    AlertDialog.Builder builder = new AlertDialog.Builder(mMainActivity);
    builder.setTitle("支付结果通知");
    builder.setMessage(msg);
    builder.setInverseBackgroundForced(true);
    // builder.setCustomTitle();
    builder.setNegativeButton("确定", new DialogInterface.OnClickListener() {
        @Override
        public void onClick(DialogInterface dialog, int which) {
            dialog.dismiss();
        }
    });
    builder.create().show();
  }
  private String getErrorInfoFromException(Exception e) {  
        try {  
            StringWriter sw = new StringWriter();  
            PrintWriter pw = new PrintWriter(sw);  
            e.printStackTrace(pw);  
            return "\r\n" + sw.toString() + "\r\n";  
        } catch (Exception e2) {  
            return "bad getErrorInfoFromException";  
        }  
    }  
  @ReactMethod
  public void startPay(Callback callback) {
    /*************************************************
    * 步骤1：从网络开始,获取交易流水号即TN
    ************************************************/
    //successCallback.invoke("开始支付");
    String tn = null;
    InputStream is;
    try {

        String url = TN_URL_01;

        URL myURL = new URL(url);
        URLConnection ucon = myURL.openConnection();
        ucon.setConnectTimeout(120000);
        is = ucon.getInputStream();
        int i = -1;
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        while ((i = is.read()) != -1) {
            baos.write(i);
        }

        tn = baos.toString();
        is.close();
        baos.close();
    } catch (Exception e) {
        e.printStackTrace();
    }
    //successCallback.invoke(tn);
    if (tn == null || tn.length() == 0) {
      AlertDialog.Builder builder = new AlertDialog.Builder(mMainActivity);
      builder.setTitle("错误提示");
      builder.setMessage("网络连接失败,请重试!");
      builder.setNegativeButton("确定",
              new DialogInterface.OnClickListener() {
                  @Override
                  public void onClick(DialogInterface dialog, int which) {
                      dialog.dismiss();
                  }
              });
      builder.create().show();
    } else {
        /*************************************************
         * 步骤2：通过银联工具类启动支付插件
         ************************************************/
        //callback.invoke(tn);
        try{
          //UPPayAssistEx.startPay(mMainActivity, null, null, tn, mMode);
          UPPayAssistEx.startPayByJAR(mMainActivity, PayActivity.class, null, null, tn, mMode);
          // AlertDialog.Builder builder = new AlertDialog.Builder(mMainActivity);
          // builder.setTitle("支付结果通知");
          // builder.setMessage("支付接口");
          // builder.setInverseBackgroundForced(true);
          // builder.setNegativeButton("确定", new DialogInterface.OnClickListener() {
          //     @Override
          //     public void onClick(DialogInterface dialog, int which) {
          //         dialog.dismiss();
          //     }
          // });
          // builder.create().show();
        } catch (Exception e) {
          //e.printStackTrace();
          //String info = getErrorInfoFromException(e);
          callback.invoke(e.getMessage());
        }
        //errorCallback.invoke("支付错误");
    }

  }
}
