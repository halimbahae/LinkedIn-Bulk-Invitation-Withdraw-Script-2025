# LinkedIn Bulk Invitation Withdrawal Automation Script #2025 Version

Withdraw All Your LinkedIn Connection Invitations Automatically With No Effort

Managing a large number of pending connection requests on LinkedIn can be time-consuming. This updated **2025 script** automatically withdraws all your pending invitations, including handling the confirmation popup, so you don’t need to click anything manually.

---

## How It Works

Copy the content of the `linkedin-bulk-invitation-withdraw-script-2025.js` file, paste it into the Chrome developer console, press Enter, and let the script handle the rest automatically.

---

## Steps to Use the Script

1. **Visit the Invitation Manager**:  
   Open Chrome on your Mac or PC and navigate to [LinkedIn Invitation Manager - Sent](https://www.linkedin.com/mynetwork/invitation-manager/sent/).

2. **Open Developer Tools**:  
   Right-click on the page, select **Inspect**, and switch to the **Console** tab.

3. **Paste and Run the Script**:  
   Copy the script from `linkedin-bulk-invitation-withdraw-script-2025.js`, paste it into the console, and press Enter.  

```javascript
/*
Developed by: Bahae Eddine HALIM
Contact: https://www.linkedin.com/in/halimbahae/

You are free to use this script anywhere with proper credit and contact info of the developer.
*/

(function() {
    console.log("Started LinkedIn Withdraw Automation");

    let totalCount = 0;
    const timeoutInterval = 2000; // 2 seconds between actions

    function findWithdrawButtons() {
        return Array.from(document.querySelectorAll('span'))
            .filter(el => el.innerText.trim() === 'Withdraw');
    }

    function clickConfirmButton() {
        const confirmBtn = Array.from(document.querySelectorAll('button, span'))
            .find(el => el.innerText.trim() === 'Withdraw' && el.offsetParent !== null);
        if (confirmBtn) {
            try {
                confirmBtn.click();
                totalCount++;
                console.log(`Confirmed withdrawal #${totalCount}`);
                return true;
            } catch (err) {
                console.error("Failed to click confirm:", err);
                return false;
            }
        }
        return false;
    }

    function runWithdraw() {
        const buttons = findWithdrawButtons();
        if (buttons.length === 0) {
            console.log("No withdraw buttons found. Retrying in 3 seconds...");
            setTimeout(runWithdraw, 3000);
            return;
        }

        const button = buttons[0]; // Pick the first one
        try {
            button.click();
            console.log("Clicked initial Withdraw button");
        } catch (err) {
            console.error("Failed to click initial button:", err);
        }

        setTimeout(() => {
            if (clickConfirmButton()) {
                console.log("Clicked confirm in modal");
            } else {
                console.log("Confirm button not found, maybe already processed");
            }
            setTimeout(runWithdraw, timeoutInterval);
        }, 1000);
    }

    runWithdraw();
})();
