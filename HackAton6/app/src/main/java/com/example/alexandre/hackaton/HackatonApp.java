package com.example.alexandre.hackaton;

import android.app.Application;

import fr.cobaltians.cobalt.Cobalt;

/**
 * Created by Alexandre on 17/04/2015.
 */
public class HackatonApp extends Application {

    @Override
    public void onCreate() {
        super.onCreate();
        Cobalt.DEBUG = true;
        //Cobalt.getInstance(this).setResourcePath("www/");
    }
}
