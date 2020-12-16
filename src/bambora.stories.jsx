/* eslint-disable no-alert */
import React from 'react';
import Bambora, {
  Submit,
  CreditCardField,
  CvvField,
  ExpiryField,
  Name,
} from '.';

export default {
  title: 'Bambora',
  parameters: {
    component: Bambora,
    componentSubtitle:
      'Material UI implementation for credit card tokenization',
  },
};

export const Demo = () => (
  <Bambora
    onTokenization={(e) =>
      new Promise((resolve) => {
        setTimeout(() => {
          // eslint-disable-next-line
          console.log(e);
          resolve();
        }, 2000);
      })
    }
  >
    <Name label="Name" />
    <CreditCardField label="Credit card number" />
    <CvvField label="CVV" />
    <ExpiryField label="Expiry" />
    <Submit />
  </Bambora>
);

export const WithOptions = () => (
  <Bambora
    options={{
      'card-number': {
        brands: ['visa'],
      },
    }}
    onTokenization={() =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 2000);
      })
    }
  >
    <CreditCardField label="Credit card number" />
    <CvvField label="CVV" />
    <ExpiryField label="Expiry" />
    <Submit />
  </Bambora>
);
