import { ChangeEvent, useEffect, useState } from "react";
import Blockies from "react-blockies";
import { useEnsAddress } from "wagmi";
import { getDefaultProvider } from "ethers";
interface IAddressInput {
  onSuccess?: (arg: string) => void;
  placeholder?: string;
}

// ToDo:  move this function to an utility file
const isENS = (address = "") => address.endsWith(".eth") || address.endsWith(".xyz");

/**
 * Address input with ENS name resolution
 */
const AddressInput = ({ placeholder, onSuccess }: IAddressInput) => {
  const [address, setAddress] = useState("");

  const { data: ensData, isLoading } = useEnsAddress({
    name: address,
    enabled: isENS(address),
    chainId: 1,
    cacheTime: 30_000,
  });

  const onChangeAddress = async (event: ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const [showData, setShowData] = useState(false);
    function toggle(){
      setShowData(!showData);
    }

  useEffect(() => {
    if (!ensData) return;

    setAddress(ensData);
    if (onSuccess) {
      onSuccess(ensData);
    }
  }, [ensData, onSuccess]);
 

  return (
    <>
      <div className="form-control">
        <label className="input-group input-group-sm" style={{margin:"auto",}}>
          <input
            type="text"
            placeholder={placeholder}
            className={`input input-bordered h-10 ${ensData === null && "input-error"}`}
            value={address || ""}
            onChange={onChangeAddress}
            disabled={isLoading}
            //Some kinda error here for why it splits n stuff after click, cant figure out
            style={{backgroundColor:'white', color:'black', position:'static', alignItems:'center'}}
            
          />
          <span className="p-0 rounded-md bg-base-100 h-10" style={{}}>
          
          {/* TODO button still needs to snap into mobile version */}
            <button style={{ borderTopRightRadius: "10px", padding:"4px", borderBottomRightRadius: "10px", border: "1px solid green", backgroundColor: "limegreen", color:"black"}} onClick={toggle}>Show Covenants Farm</button>
          
          
          </span>
        </label>
      </div>
            <div style={{borderRadius:'10px', border: '1px solid white', padding:'50px', marginLeft: '2vw', marginTop:'4vh', marginBottom:'4vh', display: showData?"inline-block":"none"}}>
              <div>
                Data 1
              </div>
            </div>
            <div style={{borderRadius:'10px', border: '1px solid white', padding:'50px', marginLeft: '4vw', marginTop:'4vh', marginBottom:'4vh', display: showData?"inline-block":"none"}}>
              Data 2
            </div>
            <div style={{borderRadius:'10px', border: '1px solid white', padding:'50px', marginLeft: '4vw', marginRight: '2vw', marginTop:'4vh', marginBottom:'4vh', display: showData?"inline-block":"none"}}>
              Data 3
            </div>
    </>
  );
};

export default AddressInput;
