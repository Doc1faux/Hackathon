package com.example.alexandre.hackaton;

import org.json.JSONObject;

import fr.cobaltians.cobalt.fragments.CobaltFragment;

/**
 * Created by Alexandre on 22/04/2015.
 */
public class CreateFragment extends CobaltFragment {
    @Override
    protected boolean onUnhandledCallback(String callback, JSONObject data) {
        // TODO Auto-generated method stub
        return false;
    }

    @Override
    protected boolean onUnhandledEvent(String event, JSONObject data, String callback) {
        // TODO Auto-generated method stub
        return false;
    }

    @Override
    protected void onUnhandledMessage(JSONObject message) {
        // TODO Auto-generated method stub
    }

    @Override
    protected void onPullToRefreshRefreshed() {
        // TODO Auto-generated method stub
    }

    @Override
    protected void onInfiniteScrollRefreshed() {
        // TODO Auto-generated method stub
    }

    public void onResetButtonClicked() {
        sendEvent("resetEvent", null, null);
    }
}
