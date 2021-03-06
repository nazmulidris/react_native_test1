package com.awesomeproject.mynativetoast;

import android.util.Log;
import android.widget.Toast;
import com.facebook.react.bridge.*;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

/**
 * Created by nazmul on 7/10/16.
 */
public class MyNativeToast_Module extends ReactContextBaseJavaModule {

/**
 * these are the keys that are exposed to JS as constants
 */
private static final String KEY_SHORT = "SHORT";
private static final String KEY_LONG  = "LONG";
private static final String TAG       = "MyNativeToast";


ScheduledExecutorService executor;

@Override
public void onCatalystInstanceDestroy() {
  super.onCatalystInstanceDestroy();
  if (executor != null) executor.shutdown();
  Log.i(TAG, "onCatalystInstanceDestroy: shutting down executor");
}

public MyNativeToast_Module(final ReactApplicationContext reactContext) {
  super(reactContext);

  // create an executor to send events to the JS client
  Runnable task = new Runnable() {
    @Override
    public void run() {

      try {
        String eventName = "MyNativeToast";
        WritableMap params = Arguments.createMap();
        params.putString("number", String.valueOf(Math.random()));

        reactContext
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, params);

      } catch (Exception e) {
        Log.e(TAG, "MyNativeToast_Module: task having problems", e);
      }

      Log.i(TAG, "MyNativeToast_Module: firing event to JS");

    }
  };
  executor = Executors.newSingleThreadScheduledExecutor();
  executor.scheduleWithFixedDelay(task, 1, 5, TimeUnit.SECONDS);
  Log.i(TAG, "MyNativeToast_Module: starting executor");

}

/**
 * this is the module name that JS imports.
 * ReactContextBaseJavaModule requires that a method called getName is
 * implemented. The purpose of this method is to return the string name
 * of the NativeModule which represents this class in JavaScript. So
 * here we will call this MyNativeToast so that we can access it through
 * React.NativeModules.MyNativeToast in JavaScript.
 */
@Override
public String getName() {
  return "MyNativeToast";
}

/**
 * constants that are exposed to JS. From JS they will be accessed as
 * MyNativeToast.SHORT and MyNativeToast.LONG (which are the string
 * literals that these references point to).
 * An optional method called getConstants returns the constant values
 * exposed to JavaScript. Its implementation is not required but is
 * very useful to key pre-defined values that need to be communicated
 * from JavaScript to Java in sync.
 */
@Override
public Map<String, Object> getConstants() {
  final Map<String, Object> constants = new HashMap<>();
  constants.put(KEY_SHORT, Toast.LENGTH_SHORT);
  constants.put(KEY_LONG, Toast.LENGTH_LONG);
  return constants;
}

/**
 * NOTE - each @ReactMethod must have a unique name (not method signature).
 * this is the method that's exposed to JS.
 * To expose a method to JavaScript a Java method must be annotated
 * using @ReactMethod. The return type of bridge methods is always void.
 * React Native bridge is asynchronous, so the only way to pass a
 * result to JavaScript is by using callbacks or emitting events.
 * <p/>
 * The following types are auto mapped (for input params to this method)
 * from JS -> Java:
 * <pre>
 * Boolean -> Bool
 * Integer -> Number
 * Double -> Number
 * Float -> Number
 * String -> String
 * Callback -> function
 * ReadableMap -> Object
 * ReadableArray -> Array
 * </pre>
 */
@ReactMethod
public void show(String message, int duration) {
  Toast.makeText(getReactApplicationContext(), message, duration).show();
}

/**
 * NOTE - each @ReactMethod must have a unique name (not method signature).
 * this is the method that's exposed to JS.
 *
 * @param message
 * @param duration
 * @param errorCallback
 * @param successCallback
 */
@ReactMethod
public void show_callbacks(String message, int duration, Callback errorCallback, Callback successCallback) {
  try {
    Toast.makeText(getReactApplicationContext(), message, duration).show();
    successCallback.invoke("Native toast worked (callbacks)!");
  } catch (Exception e) {
    errorCallback.invoke(e);
  }

}

/**
 * NOTE - each @ReactMethod must have a unique name (not method signature).
 * this is the method that's exposed to JS.
 *
 * @param message
 * @param duration
 * @param promise
 */
@ReactMethod
public void show_promise(String message, int duration, Promise promise) {
  try {
    Toast.makeText(getReactApplicationContext(), message, duration).show();
    promise.resolve("Native toast worked (promise)!");
  } catch (Exception e) {
    promise.reject(e);
  }

}

}// end class