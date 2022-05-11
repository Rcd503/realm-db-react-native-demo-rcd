import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { incrementCount, decrementCount } from '../redux/actions/incrementer';
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

const ViewCode: React.FC = (props: any) => {
  const dispatch = useDispatch()
  const counter = useSelector((state: any) => state.counter.counter)

  return (
    <View style={styles.containerView}>
      <Text>{counter}</Text>
      <Button
        title="Increment"
        onPress={() =>
          dispatch(incrementCount(counter))
          // props.increment(props.counter.counter)
        }
      />
      <Button
        title="Decrement"
        onPress={() => dispatch(decrementCount(counter))}
      />
    </View>
  );
}

export default ViewCode;

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
