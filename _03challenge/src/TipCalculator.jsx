import React, { useState } from 'react'
import BillInput from './BillInput'
import PercentageTip from './PercentageTip'
import Content from './Content'

const TipCalculator = () => {
    const [billValue, setBillValue] = useState("");
    const [yourTip, setYourTip] = useState(0);
    const [friendTip, setFriendTip] = useState(0);

    const tipValue = (yourTip + friendTip) / 2;
    const totalBill = tipValue + billValue;

    function handleReset(e) {
        e.preventDefault();
        setBillValue("");
        setYourTip(0);
        setFriendTip(0);
    }

    return (
        <form>
            <BillInput billValue={billValue} onBillValueChange={setBillValue} />
            <PercentageTip tip={yourTip} onSetTip={setYourTip}>
                <p>How did you like the service?</p>
            </PercentageTip>
            <PercentageTip tip={friendTip} onSetTip={setFriendTip}>
                <p>How did your friend like the service?</p>
            </PercentageTip  >
            {
                billValue > 0
                &&
                <Content onReset={handleReset} >
                    <p>You pay ${totalBill} (${billValue} + ${tipValue} tip)</p>
                </Content>
            }
        </form>
    )
}

export default TipCalculator