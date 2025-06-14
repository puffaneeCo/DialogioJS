$(document).ready(async function () {
  const Toast = new DialogerToast(0);
  const Confirm = new DialogerConfirm();
  const Result = await Confirm.Show(
    "test",
    "test",
    DialogerButtons.ContinueBack
  );
  Toast.Notif(`${Result}`);
});
