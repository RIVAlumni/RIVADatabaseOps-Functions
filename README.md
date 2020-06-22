# RIVADatabaseOps - Functions

The back-end Cloud Functions maintaining RIVAlumni's Firestore operations.

## Installation

Use [Git](https://git-scm.com/) to download the source code.

```bash
git clone https://github.com/RIVAlumni/RIVADatabaseOps-Functions.git
```

And use [Firebase Tools](https://www.npmjs.com/package/firebase-tools) to initialize the Functions emulator.

```bash
npm i -g firebase-tools@latest
firebase init functions
firebase init emulators
```

## Usage

### Development Testing

1. Run `firebase emulators:start --only firestore,functions`
2. Run `firebase functions:log`
3. Check for any errors.

## Support

**Note: This project is intended to only be used by RIVAlumni**

Should you have any difficulties, please create a [new issue](https://github.com/RIVAlumni/RIVADatabaseOps-Functions/issues/new) and describe clearly the issue with reproducible steps.

## Contributing

**Note: Any pull requests that change the `firestore` ruleset will be rejected. Should you feel a need to change the ruleset, please create a new issue.**

Pull requests are welcome. For major changes, please [open an issue](https://github.com/RIVAlumni/RIVADatabaseOps-Functions/issues/new) first to discuss what you would like to change.

## Authors

- [Aaron Teo](https://github.com/taronaeo) — RIVAlumni

## License

[MIT](https://choosealicense.com/licenses/mit/)
