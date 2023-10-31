import { AiOutlineGithub } from 'react-icons/ai';

export default function Footer() {
  return (
    <div className="flex h-16 items-center justify-center lg:h-14">
      <p className="flex items-center">
        <span className="mr-2 font-semibold text-neutral-200">Made by </span>
        <a
          href="https://github.com/bibekjodd"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex w-fit items-center"
        >
          <AiOutlineGithub className="mr-1 h-5 w-5 text-white" />
          <span className="font-semibold text-neutral-100 group-hover:underline">
            @bibekjodd{' '}
          </span>
        </a>
      </p>
    </div>
  );
}
