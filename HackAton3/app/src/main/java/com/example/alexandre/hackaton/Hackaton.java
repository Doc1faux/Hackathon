package com.example.alexandre.hackaton;

import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;

import fr.cobaltians.cobalt.Cobalt;
import fr.cobaltians.cobalt.activities.CobaltActivity;
import fr.cobaltians.cobalt.fragments.CobaltFragment;

/**
 * Created by Alexandre on 17/04/2015.
 */
public class Hackaton extends CobaltActivity{

    protected CobaltFragment getFragment() {
        return Cobalt.getInstance(this).getFragmentForController(MainFragment.class, "default", "index.html");
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.menu_main, menu);
        return super.onCreateOptionsMenu(menu);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        if (id == R.id.action_add) {
            MainFragment add = (MainFragment) getSupportFragmentManager().findFragmentById(getFragmentContainerId());
            //add.onAddButtonClicked();
            return true;
        }

        return super.onOptionsItemSelected(item);
    }
}
