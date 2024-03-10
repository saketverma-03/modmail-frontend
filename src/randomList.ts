//..TODO: use chat gpt to create following
// create list of labels and details discord support queru along with small respons message, should contain imojis
//
// create javascript array of length 20 with elements as `{label:string,message:string}`,
// label is discord support query lable and message is labels response, these should contain very small text and emojis
//
// Generate a random no. betwen 1-20
//
const supportQueries = [
    { label: 'Login Issue', message: '🔐 Please reset your password!' },
    { label: 'Bug Report', message: "🐞 Thanks! We'll investigate ASAP." },
    {
        label: 'Payment Failed',
        message: '💳 Please try another payment method or contact your bank.',
    },
    {
        label: 'Server Down',
        message: "🛠 We're currently experiencing issues. Please bear with us.",
    },
    {
        label: 'Voice Chat Issue',
        message: '🎙 Make sure your mic is properly connected.',
    },
    {
        label: 'Account Banned',
        message: '🚫 For ban inquiries, reach out to our support team.',
    },
    { label: 'Feature Request', message: '✨ Your suggestion has been noted!' },
    {
        label: 'Report a User',
        message: '🚨 Please provide detailed evidence of the violation.',
    },
    {
        label: 'Invite Link Expired',
        message: '🔗 Please request a new invite from the server admin.',
    },
    {
        label: "Can't Send Messages",
        message: '🚫 Ensure you have the correct permissions in the server.',
    },
    {
        label: 'Change Username',
        message: '🖊️ You can change your username in user settings.',
    },
    {
        label: 'Delete Account',
        message: '🗑️ Account deletion is permanent. Proceed with caution.',
    },
    {
        label: 'Nitro Subscription Issues',
        message: '💎 Please verify your payment info or contact support.',
    },
    {
        label: 'Mobile App Crashing',
        message: '📱 Try clearing the app cache or reinstalling Discord.',
    },
    {
        label: 'Discord Nitro Gifts',
        message: "🎁 Gift Nitro through the user's profile or server settings.",
    },
    {
        label: 'Two-Factor Authentication Help',
        message: '🔐 For 2FA support, visit our help center.',
    },
    {
        label: 'Server Roles Questions',
        message: '🎭 Manage roles in server settings or contact an admin.',
    },
    {
        label: 'Missing Emojis',
        message: '😭 Some emojis may be Nitro-exclusive or server-specific.',
    },
    {
        label: 'Audio Quality Problems',
        message:
            '🎧 Check your settings and ensure a good internet connection.',
    },
    {
        label: 'Video Calls Not Working',
        message: '📹 Ensure your camera and microphone are properly set up.',
    },
    {
        label: 'App Installation Issues',
        message: '💾 For installation help, refer to our guide or support.',
    },
    {
        label: 'Update Failed',
        message:
            '🔄 Make sure you have a stable internet connection for updates.',
    },
    {
        label: "Can't Join Server",
        message:
            '🚪 Check if the server is full or if you have the correct invite.',
    },
    {
        label: 'Text Channel Issues',
        message: '📝 Ensure you have permission to view and send messages.',
    },
    {
        label: 'Lost Account Access',
        message: '🔑 Contact support with any account recovery questions.',
    },
    {
        label: 'Friend Request Failed',
        message: "👥 Make sure you've entered the correct username#tag.",
    },
    {
        label: 'Screen Share Not Working',
        message: '🖥 Check your application permissions and try again.',
    },
    {
        label: 'Bot Not Responding',
        message:
            '🤖 Ensure the bot is online and that you have the correct permissions.',
    },
    {
        label: 'Emoji Upload Failed',
        message: '😞 Check the file size and format before uploading.',
    },
    {
        label: 'Server Settings',
        message: '⚙️ For help with server settings, visit our support center.',
    },
    {
        label: 'Account Verification',
        message: '✅ Please check your email for the verification link.',
    },
    {
        label: 'Discord Nitro Benefits',
        message: '💖 Explore all Nitro perks in your user settings.',
    },
    {
        label: 'User Harassment',
        message: "🛡 Report harassment directly through the user's profile.",
    },
    {
        label: "Can't Hear Anyone",
        message:
            '🔇 Check your audio output settings and ensure your headphones are connected.',
    },
    {
        label: 'Microphone Not Detected',
        message:
            '🎤 Ensure your microphone is plugged in and set as the default device.',
    },
    {
        label: 'Server Invitation',
        message:
            "💌 You can invite friends to a server via the server's invite link.",
    },
    {
        label: 'Discord Widgets',
        message: '🌐 Add a Discord widget to your site with our easy guide.',
    },
    {
        label: 'Privacy Concerns',
        message:
            '🔒 Review and adjust your privacy settings in the user panel.',
    },
    {
        label: 'API Questions',
        message:
            '🔧 For API documentation and support, visit our developer site.',
    },
    {
        label: 'Role Permissions',
        message: '🔑 Adjust role permissions in the server settings menu.',
    },
    {
        label: 'Custom Status',
        message: '💬 Set a custom status in your profile settings.',
    },
    {
        label: 'Direct Messages',
        message: "✉️ Check your privacy settings if you can't receive DMs.",
    },
    {
        label: 'Server Boost',
        message:
            '🚀 Boost your favorite server for exclusive perks and emojis!',
    },
    {
        label: 'Game Integration',
        message: '🎮 Connect your game account for seamless integration.',
    },
    {
        label: 'Voice Channels',
        message: '🗣 For voice channel setup and tips, visit our help center.',
    },
    {
        label: 'Streaming on Discord',
        message: '📡 For the best streaming settings, check our user guide.',
    },
    {
        label: 'Discord Events',
        message: '📅 Create and manage events directly within your server.',
    },
    {
        label: 'Server Verification',
        message: '✅ Apply for server verification through our official form.',
    },
    {
        label: 'Discord on Consoles',
        message: '🎮 For information on console support, please check our FAQ.',
    },
    {
        label: 'Bot Development',
        message: '🤖 Explore bot development resources on our developer site.',
    },
];

export function getRandomValue(): { label: string; message: string } {
    return supportQueries[Math.floor(Math.random() * 50)];
}
