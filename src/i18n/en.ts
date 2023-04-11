export const en = {
  common: {
    ok: 'Ok',
    cancel: 'Cancel'
  },
  oauth: {
    login: 'Login',
    logout: 'Logout',
    username: 'Username',
    password: 'Password',
    usernameRequired: 'Name is required',
    passwordRequired: 'Password is required',
    usernameLength: 'Name must be less than {0} characters',
    passwordLength: 'Password must be less than {0} characters'
  },
  search: {
    facetApplied: 'Applied facets'
  },
  carts: {
    importCart: {
      savedCartDescription:
        'This cart was created by CSV import {name}. Successfully imported:{success} lines. Imported but with quantity adjustment: {quantity} lines. Could not import: {failed} lines.'
    }
  },
  login: {
    guestLogin: {
      title: 'New to {storefront} Site?',
      subtitle: 'Proceed as guest.'
    },
    userLogin: {
      title: 'Returning Customer',
      subtitle: 'Already have an account? Sign in to retrieve your account settings.'
    },
    userRegister: {
      title: 'Create an Account',
      subtitle:
        'For a fast checkout, easy access to previous orders, and the ability to create an address book and store settings. Register below.'
    },
    loginForm: {
      username: 'Account',
      usernamePlaceholder: 'Email address',
      usernameRequired: 'Email address is required',
      usernameMinLength: 'Email address must greater than {0} characters',
      usernameMaxLength: 'Email address must be less than {0} characters',
      password: 'Password',
      passwordPlaceholder: 'Enter your password',
      passwordRequired: 'Password is required',
      passwordMinLength: 'Password must greater than {0} characters',
      passwordMaxLength: 'Password must be less than {0} characters',
      warning:
        'Warning: After 3 consecutive failed login attempts, you account will be temporarily locked for three hours. If you must login now, you can also click "Forgot login password?" below to reset the login password.',
      login: 'Login',
      error: {
        invalid_grant: 'User is disabled'
      }
    },
    resetPasswordForm: {
      title: 'Forgot login password?'
    }
  }
}
