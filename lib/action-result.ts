export type ActionResult<T = undefined> = {
  ok?: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
};

export function validationFailure(errors: Record<string, string[]>, message = "Vérifiez les champs du formulaire.") {
  return { ok: false, errors, message } satisfies ActionResult;
}

export function actionFailure(message: string) {
  return { ok: false, message } satisfies ActionResult;
}

export function actionSuccess(message: string) {
  return { ok: true, message } satisfies ActionResult;
}
