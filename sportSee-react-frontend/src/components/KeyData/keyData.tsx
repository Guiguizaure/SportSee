// Define the prop types
interface KeyDataProps {
  dataIcon: string;
  dataNumber: string | number;
  dataType: string;
}

const KeyData: React.FC<KeyDataProps> = ({
  dataIcon,
  dataNumber,
  dataType,
}) => {
  return (
    <div className="key-data flex items-center bg-light-grey rounded-[5px]">
      <img className="data-icon" src={dataIcon} alt="Data Icon" />
      <div className="key-data-text flex flex-col gap-[2px]">
        <div className="data-number text-blue-grey text-[20px] font-bold leading-[24px]">
          {dataNumber}
        </div>
        <div className="data-type text-grey text-[14px] font-[500] leading-[24px]">
          {dataType}
        </div>
      </div>
    </div>
  );
};

export default KeyData;
