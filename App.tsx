import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

let timerActual: any = null;
let ss = 0;
let mm = 0;
let hh = 0;

export default function App() {
  const [timer, setTimer] = useState<string | number>('00:00:00');
  const [btnText, setBtnText] = useState('Start');
  const [lastTime, setLastTime] = useState<null | number | string>(null);

  function start() {
    if (timerActual !== null) {
      clearInterval(timerActual);
      timerActual = null;
      setBtnText('Start');
    } else {
      timerActual = setInterval(() => {
        ss++;

        if (ss === 60) {
          ss = 0;
          mm++;
        }
        if (mm === 60) {
          mm = 0;
          hh++;
        }
        let format =
          (hh < 10 ? '0' + hh : hh) +
          ':' +
          (mm < 10 ? '0' + mm : mm) +
          ':' +
          (ss < 10 ? '0' + ss : ss);

        setTimer(format);
      }, 1000);
      setBtnText('Stop');
    }
  }
  function reset() {
    if (timerActual !== null) {
      clearInterval(timerActual);
      timerActual = null;
    }
    setLastTime(timer);
    setTimer(0);
    ss = 0;
    mm = 0;
    hh = 0;
    setBtnText('Start');
  }

  return (
    <View style={styles.container}>
      <Image source={require('./src/crono.png')} />
      <Text style={styles.timer}>{timer}</Text>

      <View style={styles.btnArea}>
        <TouchableOpacity style={styles.btn} onPress={start}>
          <Text style={styles.btnText}>{btnText}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={reset}>
          <Text style={styles.btnText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.lastTimeArea}>
        <Text style={styles.lastTimeAreaText}>
          {lastTime ? 'Last time: ' + lastTime : ''}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00aeef',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timer: {
    marginTop: -160,
    fontSize: 45,
    fontWeight: 'bold',
    color: '#FFF',
  },
  btnArea: {
    flexDirection: 'row',
    marginTop: 130,
    height: 40,
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    height: 40,
    margin: 17,
    borderRadius: 9,
  },
  btnText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00aeef',
  },
  lastTimeArea: {
    marginTop: 40,
  },
  lastTimeAreaText: {
    fontSize: 25,
    fontStyle: 'italic',
    color: '#FFF',
  },
});
