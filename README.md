# GULL

Gull is a *UDP sound machine* designed to be controlled externally. It was created as a companion application to the livecoding environment [ORCA](https://hundredrabbits.itch.io/orca).

## Install & Run

TODO / add details / package into electron app
If you want to build Gull yourself, follow these steps:

```
git clone https://github.com/qleonetti/gull.git
cd gull
npm install
npm start
```

## Config
Samples should be in `wav` format and go into `/samples`. The server will hot reload when new samples are added.

## Creating channels

A channel is written on one line of the editor. Channels can share the same id to be triggered together.

Channels are composed by blocks, each block start with a capital letter then is followed by base 36 parameters.

Each channel declaration starts with a generator:

* P(chan, sampler): sample player block
* S(chan, waveform): synth block (waveform not supported yet)

A modifier block exist for the sample player:

* C(start, duration): sample cutter

Possible upcoming effect blocks: 

* D(time,feedback) : delay
* R(decay, wet): reverb

## Remote Control

Gull has up to 36 channels. Commands can be sent through UDP via the port `49161`.

### Play

The play command allows you to trigger samples.

| Command  | Channel | Octave | Fine | Velocity |
| :-       | :-:     | :-:    | :-:  | :-:      |
| `0`      | 0       | 0      | 0    |          |
| `04c`    | 0       | 4      | C    | _64_     |
| `04cf`   | 0       | 4      | C    | 127      |

For the sample player, the fine setting is in 35ths of an octave.
For the synth, the fine is notes (C,D,E etc)

### Settings

- TODO

## Roadmap
I've been quite inspired by Orca and what is being done with it.
To really enjoy it I need a configurable sampler, so there's a proof of concept of that in the form of a barebones live editable config.

But what could come next: grid like config, between orca and [zoia](https://empresseffects.com/products/zoia) to create custom channels that can be triggered by UPD.
Then more custom blocks for effects, lfo, sound generators.

Special thanks to [Tone.js](https://tonejs.github.io), the scope of work would be quite different without it!
