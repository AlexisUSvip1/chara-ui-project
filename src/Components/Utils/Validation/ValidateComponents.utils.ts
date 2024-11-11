import * as Yup from 'yup';

export const inputValidationSchema = Yup.object({
  id: Yup.string().required('El ID es obligatorio'),
  label: Yup.string().required('El nombre del label es obligatorio'),
  placeholder: Yup.string().required('El placeholder es obligatorio'),
  isRequired: Yup.boolean(),
});

export const selectValidationSchema = Yup.object({
  selectId: Yup.string()
    .required('El ID es obligatorio'),
  label: Yup.string()
    .required('El label es obligatorio'),
  options: Yup.array()
    .of(
      Yup.object({
        id: Yup.number().required(),
        label: Yup.string().required(),
      })
    )
    .min(1, 'Debe haber al menos una opción')
});


export const checkboxValidationSchema = Yup.object({
    id: Yup.string().required('El ID es obligatorio'),
    label: Yup.string().required('El label es obligatorio'),
    isChecked: Yup.boolean(),

});