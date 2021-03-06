
# react-native-HDWallet

HDWallet supports Bip39 / Bip44 protocol on React-Native

## Getting started

`$ npm install react-native-HDWallet --save`

### Mostly automatic installation

`$ react-native link react-native-HDWallet`

### Manual installation

#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-HDWallet` and add `RNHDWallet.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNHDWallet.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.hdWallet.RNHDWalletPackage;` to the imports at the top of the file
  - Add `new RNHDWalletPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-HDWallet'
  	project(':react-native-HDWallet').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-HDWallet/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-HDWallet')
  	```

## Usage
```javascript
import * as HDWallet from 'react-native-HDWallet';

// bip39 online: https://iancoleman.io/bip39/

// Generate a random mnemonic phrase through specific entropy length.
// The default entropy length is 128 bits and mnemonic phrase contains 12 words.
// In most cases you don't need to provide the entropy length unless you want to generate mnemonic phrase more than 12 words.
const mnemonic = HDWallet.generateMnemonic()
	.then(phrase => ...)
	.catch(error => ...);
// => phrase: 'spatial bracket mutual sense salt disagree plastic novel figure flight grunt spring'

const phrase = 'spatial bracket mutual sense salt disagree plastic novel figure flight grunt spring';

const invalidPhrase = 'history potato major amount fluid then cup vocal fix unusual urban merge';

HDWallet.mnemonicToSeed(phrase)
	.then(seed => ...)
	.catch(error => ...);
// => seed buffer: '112, 164, 120, 171, 4, 81, 92, ... , 128, 160, 91, 230, 162, 1, 255, 217, 168, 238, 190, 25'

HDWallet.mnemonicToSeedHex(phrase)
	.then(seedHex => ...)
	.catch(error => ...);
// => seedHex: '70a478ab04515cfb3f42751d76ad91f480a05be6a2afd647fa440140fc5d996facd346e1c1e796ee30580ff122a9b9083b8fc7d38a622b759a0bffd9a8eebe19'

HDWallet.validateMnemonic(mnemonic)
	.then(valid => ...)
	.catch(error => ...);
// => valid: true

HDWallet.validateMnemonic(invalidPhrase)
	.then(valid => ...)
	.catch(error => ...);
// => valid: false
```
  