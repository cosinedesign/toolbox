/**
 * Created by Jim Ankrom on 1/31/2016.
 *
 * Data Transformations - Scale, Constrain, etc.
 *
 * - TODO: watcher object - trigger event when value reaches threshold
 */


/**
 * data.transformation - Scale and constrain data to appropriate values
 */

var data = {
    // transform a value to given scale, based on its ratio within a constraint range.
    scale: function (value, scale, constraints) {
        // We cannot scale without constraints
        if (!constraints) return value;

        var constrainedValue = data.constrain(value, constraints);

        if (scale) {
            var absoluteValue = value;
            var ratio = data.ratio(constrainedValue, constraints);
            if (ratio != null) {
                var scaleRange = scale.max - scale.min;
                var relativeOffset = ratio * scaleRange;
                absoluteValue = relativeOffset + scale.min;
            }

            return absoluteValue;
        }
        // this MUST return an unaffected value if scale or constraints don't exist
        return constrainedValue;
    },
    // Get the ratio of the value to the size of the constraint range
    ratio: function (value, constraints) {
        if (constraints) {
            var rangeSize = constraints.ceiling - constraints.floor;
            var adjustedValue = value - constraints.floor;
            return adjustedValue / rangeSize;
        }
    },
    // Constrain a value to given thresholds
    constrain: function (value, constraints) {
        if (constraints) {
            if (value < constraints.floor) return constraints.floor;
            if (value > constraints.ceiling) return constraints.ceiling;
        }
        return value;
    },
    // Transform (constrain / ratio / scale) all values
    transform: function (valueHash, config) {
        var i,
            key,
            keyConfig,
            keys = Object.keys(valueHash);
        for (i=0; i<keys.length; i++) {
            key = keys[i];
            keyConfig = config[key];
            if (keyConfig) {
                var scaleConfig = keyConfig.scale || config.scale;
                var constraintsConfig = keyConfig.constraints || config.constraints || {};
                var value = valueHash[key] || constraintsConfig.floor || 0; // TODO - create a config value for null?
                valueHash[key] = data.scale(value, scaleConfig, constraintsConfig);
            } else {
                //alert("Key not found: " + key);
            }
        }
    }
};