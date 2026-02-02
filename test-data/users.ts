/**
 * Centralized test data for Sauce Demo users.
 * Source: https://www.saucedemo.com (accepted usernames / password)
 */
export const users = {
  standard: {
    username: 'standard_user',
    password: 'secret_sauce',
  },
  lockedOut: {
    username: 'locked_out_user',
    password: 'secret_sauce',
  },
  problem: {
    username: 'problem_user',
    password: 'secret_sauce',
  },
  performanceGlitch: {
    username: 'performance_glitch_user',
    password: 'secret_sauce',
  },
  error: {
    username: 'error_user',
    password: 'secret_sauce',
  },
  visual: {
    username: 'visual_user',
    password: 'secret_sauce',
  },
} as const;

export const invalidCredentials = {
  username: 'invalid_user',
  password: 'wrong_password',
};
