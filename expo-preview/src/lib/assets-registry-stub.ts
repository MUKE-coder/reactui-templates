// Stub for @react-native/assets-registry/registry — react-native-svg pulls it
// in for asset-URI resolution which the preview sandbox never uses.
export function registerAsset(): number {
  return 0;
}
export function getAssetByID(): undefined {
  return undefined;
}
export default { registerAsset, getAssetByID };
