import React from 'react';
import _ from 'lodash';

/**
 * This is a fast-updating field that we can use whenever we need to debounce the updates to the
 * formik objects as we are typing.
 *
 * It's meant to be used in large forms or forms created with FieldArray
 */

class DebouncedField extends React.Component {
  state = {
    value: this.props.value
  };

  submitChange = _.debounce(() => {
    this.props.onChange && this.props.onChange(this.state.value);
  }, this.props.debounce || 200);

  handleChange = (event) => {
    this.setState({ value: event.target.value });

    this.submitChange();
  };

  defaultComponent = (props) => <input {...props} />;

  componentDidUpdate(prevProps) {
    if (
      prevProps.value !== this.props.value &&
      this.state.value !== this.props.value
    ) {
      this.setState({ value: this.props.value });
    }
  }

  render() {
    const { component, ...rest } = this.props;

    const Component = component || this.defaultComponent;

    return (
      <Component
        {...rest}
        value={this.state.value}
        onChange={this.handleChange}
      />
    );
  }
}

export default DebouncedField;
