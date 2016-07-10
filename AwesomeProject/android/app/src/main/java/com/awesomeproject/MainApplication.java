package com.awesomeproject;

import android.app.Application;
import com.awesomeproject.mynativetoast.MyNativeToast_Package;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
  @Override
  protected boolean getUseDeveloperSupport() {
    return BuildConfig.DEBUG;
  }

  /**
   * this adds the {@link MyNativeToast_Package} so that the module i added is
   * available to JS
   */
  @Override
  protected List<ReactPackage> getPackages() {
    return Arrays.asList(new MainReactPackage(),
                         new MyNativeToast_Package());
  }
};

@Override
public ReactNativeHost getReactNativeHost() {
  return mReactNativeHost;
}
}
