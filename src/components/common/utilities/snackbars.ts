import Snackbar from 'react-native-snackbar';

export namespace CustomSnackBars {
  export const comingSoon = () => {
    Snackbar.show({
      text: 'Coming Soon...!',
      duration: Snackbar.LENGTH_SHORT,
    });
  };

  export const requestPermission = () => {
    Snackbar.show({
      text: 'Please grant permission :)',
      duration: Snackbar.LENGTH_SHORT,
    });
  };

  export const somethingWentWrong = () => {
    Snackbar.show({
      text: 'Something went wrong :(',
      duration: Snackbar.LENGTH_SHORT,
    });
  };
}
