const ReceiptWatermark = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="transform rotate-45 text-red-500/20 text-4xl font-bold whitespace-pre-line text-center">
        RECIBO AINDA NÃO VALIDADO{"\n"}
        STATUS PENDENTE NO{"\n"}
        ONLINERECIBO.COM
      </div>
    </div>
  );
};

export default ReceiptWatermark;