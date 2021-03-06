import moment from "moment";

/**
 * Watches an object for changes, if any are detected it will trigger the callback
 */
const watchObject = (object, onChange) =>
  new Proxy(object, {
    get(target, key) {
      return target[key];
    },
    set(target, key, value) {
      // treat moment as a scalar value
      if (value && typeof value === "object" && !moment.isMoment(value)) {
        // watch the object
        target[key] = watchObject(value, onChange);

        // check if any properties are objects and watch them as well
        Object.keys(value).forEach(childKey => {
          if (value[childKey] && typeof value[childKey] === "object") {
            target[key][childKey] = watchObject(value[childKey], onChange);
          }
        });
      } else {
        // scalar value property on object has changed
        target[key] = value;
      }
      onChange();
      return true;
    },
    deleteProperty(target, key) {
      if (key in target) {
        delete target[key];
        onChange();
      }
    }
  });

export default watchObject;
