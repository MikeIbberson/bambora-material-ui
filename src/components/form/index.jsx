import React from 'react';
import PropTypes from 'prop-types';
import { invoke } from 'lodash';
import Grid from '@material-ui/core/Grid';
import { URL } from '../../utils/constants';
import Adapter from '../../utils/adapter';
import useScript from '../../utils/useScript';
import { FetchingStateProvider } from '../fetching';
import CardholderElementProxy from '../../utils/cardholderElementProxy';

const withCheckout = (Component) =>
  React.forwardRef((props, ref) => {
    const [ready] = useScript(URL);
    const remoteForm = ref || React.useRef();

    const clearAll = () =>
      invoke(remoteForm, 'current.clearAll');

    React.useEffect(() => {
      if (
        (!ready && !('customcheckout' in window)) ||
        remoteForm.current
      )
        return undefined;

      const inst = window.customcheckout();
      Adapter(inst, props.options);
      remoteForm.current = inst;

      return clearAll;
    }, [ready]);

    const handleCheckout = React.useCallback(
      (pre, post) => (e) => {
        e.preventDefault();
        pre();

        remoteForm.current.createToken((r) => {
          const ch = CardholderElementProxy();
          return post(ch.addToPayload(r))
            .then(ch.clear)
            .then(clearAll);
        });
      },
      [remoteForm],
    );

    return (
      <Component {...props} onSubmit={handleCheckout} />
    );
  });

const Form = ({ onTokenization, onSubmit, children }) => {
  const [fetching, setFetching] = React.useState(false);

  return (
    <form
      onSubmit={onSubmit(
        () => setFetching(true),
        (res) =>
          onTokenization(res).then(() =>
            setFetching(false),
          ),
      )}
    >
      <FetchingStateProvider fetching={fetching}>
        <Grid container spacing={1}>
          {children}
        </Grid>
      </FetchingStateProvider>
    </form>
  );
};

Form.propTypes = {
  /**
   * Callback for post-adapter submission.
   */
  onTokenization: PropTypes.func.isRequired,

  /**
   * Callback to generate token.
   */
  onSubmit: PropTypes.func.isRequired,

  /**
   * Ideally, an area of Fields. The adapter assumes so.
   */
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
    PropTypes.object,
  ]).isRequired,
};

export default withCheckout(Form);
