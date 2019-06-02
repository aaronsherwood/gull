const uiContext = document.getElementById('ui');
let samplers = [];
let sampleMap = {};

const editor = document.getElementById('editor');
let editorContent = '';
let channels = {};

const play = (args = []) => {
    const [chan = 0, start, duration] = args
    channels[chan] && channels[chan].forEach(ch => ch(start,duration));
}

const loadUI = () => {
    uiContext.innerHTML = '';
    samplers.forEach(function(sampler, i) {
        uiContext.insertAdjacentHTML('beforeend', `<div class="sample">[${i}] ${sampler.name}</div>`);
    });
};

const loadSamples = ({files=[], path= ''}) => {
    const samples = files.filter((name) => name.includes('.wav'))
    samplers = samples.map(function (filename,i) {
        sampleMap[i] = `${path}/${filename}`;
        const player = new Tone.Player(`${path}/${filename}`).toMaster();

        return {
            player,
            name: filename.split('.wav')[0].substring(0,8),
            length: () => player.buffer && player.buffer._buffer ? player.buffer._buffer.duration : null
        };
    });
    loadUI();
};

const listener = Listener(loadSamples, play);

const replaceChar = (line, rowId, char) => {
    const chars = line.split('');
    console.log(chars, rowId);
    if (chars.length > rowId) {
        chars[rowId] = char;
    }
    return chars.join('');
};

const remoteEdit = (rowId, lineId, char) => {
    Editor.remoteEditChar(rowId, lineId, char)
    const lines = editor.value.split('\n')
    if (lines.length > lineId)  {
        lines[lineId] = replaceChar(lines[lineId],rowId, char);
        editor.value = lines.join('\n');
    } 
};

const parseEditorContent = () => {
    let newChannels = {};
    gridData.forEach(function(line) {
        const blocks = splitBy(
            line.filter(c => c != ''),
            3
        ).filter(group => group.length === 3);
        const machine = Machine(blocks);
        if (machine != null) {
            console.log(machine)
            const {channelId, play} = machine;
            if (!newChannels[channelId]) {
                newChannels[channelId] = [];
            }
            newChannels[channelId] = [
                ...newChannels[channelId],
                play
            ];
        }
    });

    setTimeout(function() {
        channels = newChannels
    }, 200);
};

Editor.onUpdate = parseEditorContent
