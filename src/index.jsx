import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import Field from './components/field';
import { CARD, CVV, EXP, NAME } from './utils/constants';

export { default } from './components/form';
export { default as Submit } from './components/submit';

/**
 * This is very important!
 * We must wire-up the IDs before exporting.
 */
export const Name = (props) => (
  <Grid item xs>
    <TextField
      id={NAME}
      name={NAME}
      fullWidth
      required
      {...Field.defaultProps}
      {...props}
    />
  </Grid>
);

export const CreditCardField = (props) => (
  <Field id={CARD} {...props} />
);

export const CvvField = (props) => (
  <Field id={CVV} {...props} />
);

export const ExpiryField = (props) => (
  <Field id={EXP} {...props} />
);
