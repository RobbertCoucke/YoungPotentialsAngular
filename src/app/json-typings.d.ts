/**
 *  * Module zorgt ervoor dat we json files kunnen importeren via:
 *  *  import cities from '../../assets/cities.json';
 */
declare module "*.json" {
  const value: any;
  export default value;
}
