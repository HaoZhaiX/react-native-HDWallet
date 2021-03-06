
import { NativeModules } from 'react-native';
import { Buffer } from 'buffer';

const { RNHDWallet } = NativeModules;

/**
 * Precheck whether mnemonic phrase type and format is valid
 * 
 * @param {String} mnemonic
 * @return {Error}
 */
const checkMnemonic = (mnemonic) => {
  let error = null;
  if (typeof mnemonic !== 'string') {
    error = TypeError('mnemonic phrase should be string type');
  }

  const trimedPhrase = mnemonic.trim();
  if (trimedPhrase.split(/\s+/g).length < 12) {
    error = Error(`mnemonic phrase should contain more than 12 words`);
  }

  return error;
}

/**
 * Generates mnemonic phrase. (12 words by default)
 * 
 * @param {Number} entropyLength 128 bits entropy by default
 * @return {PromiseLike<Object>}
 */
export const generateMnemonic = (entropyLength = 128) => {
  const bytesLen = entropyLength / 8;
  if (!bytesLen || bytesLen % 4 || bytesLen < 16 || bytesLen > 32) {
    throw new Error(`entropy length ${entropyLength} is invalid`);
  }
  
  return RNHDWallet.generateMnemonic(entropyLength);
};

/**
 * Get 512-bits seed from mnemonic phrase.
 * 
 * @param {String} mnemonic
 * @return {PromiseLike<Object>}
 */
export const mnemonicToSeed = (mnemonic) => {
  const error = checkMnemonic(mnemonic);
  if (error) { throw error; }

  return RNHDWallet.seedFromMnemonic(mnemonic).then(seed => Buffer.from(seed));
};

/**
 * Get 64-bytes seed hex from mnemonic phrase.
 * 
 * @param {String} mnemonic
 * @return {PromiseLike<Object>}
 */
export const mnemonicToSeedHex = (mnemonic) => {
  return mnemonicToSeed(mnemonic).then(seed => Buffer.from(seed).toString('hex'));
};

/**
 * Validate mnemonic phrase
 * 
 * @param {String} mnemonic
 * @return {PromiseLike<Object>}
 */
export const validateMnemonic = mnemonic => {
  if (checkMnemonic(mnemonic)) {
    return new Promise.resolve(false);
  }

  return RNHDWallet.validateMnemonic(mnemonic);
};
