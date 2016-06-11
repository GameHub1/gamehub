import Hashes from 'jshashes';

export default function(string) {
  let hashedStr = "";
  hashedStr += new Hashes.SHA1().b64(string);
  hashedStr += new Hashes.MD5().b64(string);
  return hashedStr; 
}
