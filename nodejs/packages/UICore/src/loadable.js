import React from 'react';
import loadable from '@loadable/component';
import Loading from './CircularLoading';

export default (func, options = {}) => loadable(func, { fallback: <Loading />, ...options });
