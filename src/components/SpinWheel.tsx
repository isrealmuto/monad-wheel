import { useState } from "react";
import { Wheel } from "react-custom-roulette";
import { sdk } from '@farcaster/frame-sdk';

const data = [
  { option: 'Thanks', style: { backgroundColor: '#ffffff', textColor: '#000000' } }, // putih
  { option: '0.001', style: { backgroundColor: '#a855f7', textColor: '#ffffff' } },  // ungu muda
  { option: '0.01', style: { backgroundColor: '#6b21a8', textColor: '#ffffff' } },   // ungu tua
  { option: '0.05', style: { backgroundColor: '#a855f7', textColor: '#ffffff' } },
  { option: '0.1', style: { backgroundColor: '#6b21a8', textColor: '#ffffff' } },
  { option: '0.5', style: { backgroundColor: '#a855f7', textColor: '#ffffff' } },
  { option: '1', style: { backgroundColor: '#6b21a8', textColor: '#ffffff' } },
  { option: '3', style: { backgroundColor: '#a855f7', textColor: '#ffffff' } },
  { option: '5', style: { backgroundColor: '#6b21a8', textColor: '#ffffff' } },
];

const weightedOptions = [
  ...Array(25).fill(0),
  ...Array(25).fill(1),
  ...Array(25).fill(2),
  ...Array(20).fill(3),
  ...Array(1).fill(4),
  ...Array(1).fill(5),
  ...Array(1).fill(6),
  ...Array(1).fill(7),
  ...Array(1).fill(8),
];

export default function SpinWheel() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeIndex, setPrizeIndex] = useState(0);
  const [reward, setReward] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const spin = () => {
    const index = weightedOptions[Math.floor(Math.random() * weightedOptions.length)];
    setPrizeIndex(index);
    setMustSpin(true);
  };

  const handleSpinStop = () => {
    const result = data[prizeIndex].option;
    if (result === 'Thanks') {
      setReward(null);
      return;
    }
    setReward(result);
    setShowModal(true);
  };

  const shareCast = async () => {
    try {
      await sdk.actions.composeCast({
        text: `Saya baru saja menang ${reward} $MON di Monad Wheel by @return`,
        embeds: ['https://monad-wheel.app'],
      });
      setShowModal(false);
    } catch (err) {
      console.error("Failed to share cast", err);
      alert("Gagal membagikan cast 😢");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h1-screen bg-teal-300">
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeIndex}
        data={data.map((item, idx) => ({
          ...item,
          style: {
            backgroundColor: item.option === 'Thanks' ? '#ffffff' : idx % 2 === 0 ? '#c084fc' : '#7e22ce',
            textColor: item.option === 'Thanks' ? 'black' : 'white',
          },
        }))}
        onStopSpinning={() => {
          setMustSpin(false);
          handleSpinStop();
        }}
      />

      <button onClick={spin} className="mt-8 bg-purple-300 hover:bg-purple-400 text-white px-6 py-3 rounded-2xl shadow-lg shadow-purple-700">
        Spin
      </button>

      {showModal && reward && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-40 z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-80 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-lg font-bold"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold text-center text-purple-700 mb-4">
              🎉 Selamat! 🎉
            </h2>
            <p className="text-center text-gray-800 mb-4">
              Kamu menang {reward} MONAD
            </p>
            <button
              onClick={shareCast}
              className="w-full bg-purple-400 hover:bg-purple-500 text-white font-semibold py-2 px-4 rounded-xl shadow-md"
            >
              Share ke Farcaster
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
