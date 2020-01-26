import React from 'react';
import PropTypes from 'prop-types';
import scriptJS from 'scriptjs';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { URL } from '../../utils/constants';
import Adapter from '../../utils/adapter';

const Form = ({ onTokenization, children }) => {
  const [ready, setReady] = React.useState(false);
  const remoteForm = React.createRef();

  React.useEffect(() => {
    scriptJS(URL, () => {
      const { customcheckout } = window;
      if (customcheckout)
        setTimeout(() => {
          setReady(true);
        }, 1500);
    });
  }, []);

  React.useEffect(() => {
    if (!ready && !('customcheckout' in window)) return;
    const inst = window.customcheckout();

    Adapter(inst);
    remoteForm.current = inst;
  }, [ready]);

  const handleCheckout = (e) => {
    e.preventDefault();
    remoteForm.current.createToken((res) => {
      if (onTokenization) onTokenization(res);
      // noop
    });
  };

  return (
    <Box p={2}>
      {ready ? (
        <form onSubmit={handleCheckout}>{children}</form>
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
};

Form.propTypes = {
  /**
   * Callback for post-adapter submission.
   */
  onTokenization: PropTypes.func.isRequired,

  /**
   * Ideally, an area of Fields. The adapter assumes so.
   */
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
    PropTypes.object,
  ]).isRequired,
};

export default Form;