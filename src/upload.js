/**
 * get file extension
 * @param {String} filename input file name
 * @returns {String} file's extension
 */
export const getExt = (filename) => {
  const index = filename.lastIndexOf(".");
  if (index === -1) return "";
  return filename.slice(index + 1).toLowerCase();
};

/**
 * get accept value
 * @param {Array|Map} typeMap types to accept
 * @returns {String} list string for accept attribute of <input>
 * @example
 * getAccept([
 *  ['text/csv', 'csv'],
 *  ['application/msword', 'doc']
 * ]) // return '.csv,.doc,text/csv,application/msword'
 */
export const getAccept = (typeMap) => {
  try {
    typeMap = new Map(typeMap);
  } catch (error) {
    return "";
  }
  const extWithDot = [...typeMap.values()].map((v) => "." + v);
  return [...extWithDot, ...typeMap.keys()].join();
};

/**
 * create beforeUpload fn
 * @param {Array|Map} typeMap types to accept
 * @param {Number} sizeLimit file size limit (in KB)
 * @param {Function} typeCb callback when file.type not in typeMap
 * @param {Function} sizeCb callback when file.size exceed limit
 * @returns {Function} beforeUpload for Upload component
 * @example
 * beforeUpload([
 *  ['text/csv', 'csv'],
 *  ['application/msword', 'doc']
 * ], 10 * 1024, (file)=>{...}, (file)=>{...})
 */
export const beforeUpload = (typeMap, sizeLimit = 1024, typeCb, sizeCb) => (
  file
) => {
  try {
    typeMap = new Map(typeMap);
  } catch (error) {
    return false;
  }
  let typeOk;
  if (file.type) {
    typeOk = [...typeMap.keys()].indexOf(file.type) > -1;
  } else {
    typeOk = [...typeMap.values()].indexOf(getExt(file.name)) > -1;
  }
  const sizeOk = file.size / 1024 < sizeLimit;
  if (!typeOk && typeCb) typeCb(file);
  if (!sizeOk && sizeCb) sizeCb(file);
  return typeOk && sizeOk;
};
