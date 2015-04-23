package com.example.alexandre.hackaton;

import fr.cobaltians.cobalt.Cobalt;
import fr.cobaltians.cobalt.activities.CobaltActivity;
import fr.cobaltians.cobalt.fragments.CobaltFragment;

/**
 * Created by Alexandre on 22/04/2015.
 */
public class CreateActivity extends CobaltActivity {
    protected CobaltFragment getFragment() {
        return Cobalt.getInstance(this).getFragmentForController(CreateFragment.class, "create", "addEvent.html");
    }
}
