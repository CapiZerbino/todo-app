import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { CheckboxProps } from './checkbox.props';

const Checkbox = (props: CheckboxProps) => {
  const { checked: defaultChecked = false, label, onChange, type = 'square' } = props;
  const [checked, setChecked] = useState(defaultChecked);

  const handlePress = () => {
    setChecked(!checked);
    if (onChange) {
      onChange(!checked);
    }
  };

  const getIconName = () => {
    if (type === 'circle') {
      return checked ? 'dot-circle-o' : 'circle-o';
    } else {
      return checked ? 'check-square-o' : 'square-o';
    }
  };
  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Icon name={getIconName()} size={24} color={checked ? '#4CAF50' : '#757575'} style={styles.icon} />
      {label && <Text style={styles.label}>{label}</Text>}
    </TouchableOpacity>
  );
};

export default React.memo(Checkbox);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 8,
  },
  icon: {
    marginRight: 10,
  },
  label: {
    color: '#212121',
    fontSize: 16,
  },
});
