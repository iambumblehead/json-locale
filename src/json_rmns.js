
module.exports = (o => {
  o.lookup = (obj, nsstr) => (
    nsstr.split('.').reduce((a, b) => a ? a[b] : null, obj));
  
  o.rm = (obj, nsstr, [ns, ...rest] = nsstr.split('.')) => {
    let newobj = Object.assign({}, obj);
    
    if (rest.length > 0) {
      newobj[ns] = o.rm(newobj[ns], nsstr, rest);
    } else {
      
      delete newobj[ns];
    }

    return newobj;
  };

  o.replace = (obj, nsstr, newval, [ns, ...rest] = nsstr.split('.')) => {
    let newobj = Object.assign({}, obj);
    
    if (rest.length > 0) {
      newobj[ns] = o.replace(newobj[ns], nsstr, newval, rest);
    } else if (ns in newobj) {
      newobj[ns] = typeof newval === 'function'
        ? newval(newobj[ns])
        : newval;
    }

    return newobj;
  };  

  return o;
})({});
