interface InputInterface {
    getInput(): { domain: string, recordType: string };
    run(): void;
}

export { InputInterface };
