export default defineAppConfig({
  ui: {
    button: {
      variant: {
        brutal: `relative transition-all text-black brutal !transition-shadow-0
          dark:text-gray-900 dark:bg-{color}-400 dark:hover:bg-{color}-500 dark:disabled:bg-{color}-400 dark:focus-visible:outline-{color}-400
          bg-{color}-500 hover:bg-{color}-600 
          disabled:bg-{color}-500 disabled:cursor-not-allowed disabled:!brutal-translate disabled:!shadow-none
          focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-{color}-500 
          hover:shadow-[calc(1.2*var(--brutal-shadow-size)) calc(1.2*var(--brutal-shadow-size)) 0 black] hover:translate-y-[calc(-0.2*var(--brutal-shadow-size))] active:shadow-none active:brutal-translate`,
      },
      default: {
        variant: "brutal",
      },
    },
    input: {
      variant: {
        brutal: `bg-transparent focus:ring-0 focus:shadow-none
          focus:brutal transition-all border-dashed border-[3px] border-black`,
      },
      default: {
        variant: "brutal",
      },
    },
  },
});
