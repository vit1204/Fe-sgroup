<script setup>

// class YoutubeChannel {
//   subscribers;
//   _value;
//   constructor(value) {
//     this.subscribers = new Set();
//     this._value = value;
//   }
//   get value() {
//     return this._value;
//   }
//   subscribe(effect) {
//     if (currentEffect) {
//       this.subscribers.add(effect);
//     }
//   }
//   set value(newValue) {
//     this._value = newValue;
//     this.notify();
//   }
//   notify() {
//     this.subscribers.forEach((subscriber) => subscriber());
//   }
// }


// function ref(value) {
//   return new YoutubeChannel(value);
// }


let currentEffect = null;



class ComputedRef {
  constructor(effect) {
    this.effect = effect;
    this._value = this.compute();
    this.subscribers = new Set();
  }

  compute() {
    currentEffect = () => this.update();
    const value = this.effect();
    currentEffect = null;
    return value;
  }

  update() {
    const oldValue = this._value;
    this._value = this.compute();
    if (oldValue !== this._value) {
      this.notify();
    }
  }

  notify() {
    this.subscribers.forEach((subscriber) => subscriber());
  }

  subscribe() {
    if (currentEffect) {
      this.subscribers.add(currentEffect);
    }
  }

  get value() {
    this.subscribe();
    return this._value;
  }
}

function computed(effect) {
  return new ComputedRef(effect);
}

const state = { count: 1 };

const newState = computed(() => state.count * 2);

console.log(newState.value);

state.count++;
newState.update();

console.log(newState.value);


</script>
