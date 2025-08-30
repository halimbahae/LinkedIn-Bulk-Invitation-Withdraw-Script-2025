/*
Developed by: Bahae Eddine HALIM
Contact: https://www.linkedin.com/in/halimbahae/

You are free use this sceript anywhere with proper mentioning proper credit and contact info of the developer.

*/

// open this page https://www.linkedin.com/mynetwork/invitation-manager/sent/ and paste the script in the console and press enter to see the automation magic to withdrawn pending invitations. If all invitations are not withdrawal then repeat the process

(function() {
    console.log("Started LinkedIn Withdraw Automation");

    let totalCount = 0;
    const timeoutInterval = 2000; // 2 seconds between actions

    function findWithdrawButtons() {
        // Find all visible spans with text 'Withdraw'
        return Array.from(document.querySelectorAll('span'))
            .filter(el => el.innerText.trim() === 'Withdraw');
    }

    function clickConfirmButton() {
        // Look for the confirm button inside modal
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

        const button = buttons[0]; // Always pick the first one
        try {
            button.click();
            console.log("Clicked initial Withdraw button");
        } catch (err) {
            console.error("Failed to click initial button:", err);
        }

        // Wait a bit for the popup modal, then click confirm
        setTimeout(() => {
            if (clickConfirmButton()) {
                console.log("Clicked confirm in modal");
            } else {
                console.log("Confirm button not found, maybe already processed");
            }
            // Continue automatically
            setTimeout(runWithdraw, timeoutInterval);
        }, 1000); // wait 1 second for modal to appear
    }

    runWithdraw();
})();
