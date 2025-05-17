const OPCODES = {
  0x00: { mnemonic: "BRK", mode: "implied", size: 1 },
  0x01: { mnemonic: "ORA", mode: "indirectX", size: 2 },
  0x05: { mnemonic: "ORA", mode: "zeroPage", size: 2 },
  0x06: { mnemonic: "ASL", mode: "zeroPage", size: 2 },
  0x08: { mnemonic: "PHP", mode: "implied", size: 1 },
  0x09: { mnemonic: "ORA", mode: "immediate", size: 2 },
  0x0A: { mnemonic: "ASL", mode: "accumulator", size: 1 },
  0x0D: { mnemonic: "ORA", mode: "absolute", size: 3 },
  0x0E: { mnemonic: "ASL", mode: "absolute", size: 3 },
  
  0x10: { mnemonic: "BPL", mode: "relative", size: 2 },
  0x11: { mnemonic: "ORA", mode: "indirectY", size: 2 },
  0x15: { mnemonic: "ORA", mode: "zeroPageX", size: 2 },
  0x16: { mnemonic: "ASL", mode: "zeroPageX", size: 2 },
  0x18: { mnemonic: "CLC", mode: "implied", size: 1 },
  0x19: { mnemonic: "ORA", mode: "absoluteY", size: 3 },
  0x1D: { mnemonic: "ORA", mode: "absoluteX", size: 3 },
  0x1E: { mnemonic: "ASL", mode: "absoluteX", size: 3 },

  0x20: { mnemonic: "JSR", mode: "absolute", size: 3 },
  0x21: { mnemonic: "AND", mode: "indirectX", size: 2 },
  0x24: { mnemonic: "BIT", mode: "zeroPage", size: 2 },
  0x25: { mnemonic: "AND", mode: "zeroPage", size: 2 },
  0x26: { mnemonic: "ROL", mode: "zeroPage", size: 2 },
  0x28: { mnemonic: "PLP", mode: "implied", size: 1 },
  0x29: { mnemonic: "AND", mode: "immediate", size: 2 },
  0x2A: { mnemonic: "ROL", mode: "accumulator", size: 1 },
  0x2C: { mnemonic: "BIT", mode: "absolute", size: 3 },
  0x2D: { mnemonic: "AND", mode: "absolute", size: 3 },
  0x2E: { mnemonic: "ROL", mode: "absolute", size: 3 },

  0x30: { mnemonic: "BMI", mode: "relative", size: 2 },
  0x31: { mnemonic: "AND", mode: "indirectY", size: 2 },
  0x35: { mnemonic: "AND", mode: "zeroPageX", size: 2 },
  0x36: { mnemonic: "ROL", mode: "zeroPageX", size: 2 },
  0x38: { mnemonic: "SEC", mode: "implied", size: 1 },
  0x39: { mnemonic: "AND", mode: "absoluteY", size: 3 },
  0x3D: { mnemonic: "AND", mode: "absoluteX", size: 3 },
  0x3E: { mnemonic: "ROL", mode: "absoluteX", size: 3 },

  0x40: { mnemonic: "RTI", mode: "implied", size: 1 },
  0x41: { mnemonic: "EOR", mode: "indirectX", size: 2 },
  0x45: { mnemonic: "EOR", mode: "zeroPage", size: 2 },
  0x46: { mnemonic: "LSR", mode: "zeroPage", size: 2 },
  0x48: { mnemonic: "PHA", mode: "implied", size: 1 },
  0x49: { mnemonic: "EOR", mode: "immediate", size: 2 },
  0x4A: { mnemonic: "LSR", mode: "accumulator", size: 1 },
  0x4C: { mnemonic: "JMP", mode: "absolute", size: 3 },
  0x4D: { mnemonic: "EOR", mode: "absolute", size: 3 },
  0x4E: { mnemonic: "LSR", mode: "absolute", size: 3 },

  0x60: { mnemonic: "RTS", mode: "implied", size: 1 },
  0x61: { mnemonic: "ADC", mode: "indirectX", size: 2 },
  0x65: { mnemonic: "ADC", mode: "zeroPage", size: 2 },
  0x69: { mnemonic: "ADC", mode: "immediate", size: 2 },
  0x6C: { mnemonic: "JMP", mode: "indirect", size: 3 },
  0x6D: { mnemonic: "ADC", mode: "absolute", size: 3 },
  0x6E: { mnemonic: "ROR", mode: "absolute", size: 3 },

  0xA0: { mnemonic: "LDY", mode: "immediate", size: 2 },
  0xA1: { mnemonic: "LDA", mode: "indirectX", size: 2 },
  0xA2: { mnemonic: "LDX", mode: "immediate", size: 2 },
  0xA5: { mnemonic: "LDA", mode: "zeroPage", size: 2 },
  0xA9: { mnemonic: "LDA", mode: "immediate", size: 2 },
  0xAD: { mnemonic: "LDA", mode: "absolute", size: 3 },
  0xB1: { mnemonic: "LDA", mode: "indirectY", size: 2 },

  0xC9: { mnemonic: "CMP", mode: "immediate", size: 2 },
  0xC5: { mnemonic: "CMP", mode: "zeroPage", size: 2 },
  0xCD: { mnemonic: "CMP", mode: "absolute", size: 3 },

  0xE8: { mnemonic: "INX", mode: "implied", size: 1 },
  0xEA: { mnemonic: "NOP", mode: "implied", size: 1 },

  0xF0: { mnemonic: "BEQ", mode: "relative", size: 2 },
  0xF6: { mnemonic: "INC", mode: "zeroPageX", size: 2 },
  0xF8: { mnemonic: "SED", mode: "implied", size: 1 }
};

function disassemble6502(prgRom) {
  const output = [];
  let pc = 0;

  while (pc < prgRom.length) {
    const opcode = prgRom[pc];
    const entry = OPCODES[opcode];

    if (!entry) {
      output.push(`$${pc.toString(16).padStart(4, '0')}: ??? (Unknown opcode 0x${opcode.toString(16)})`);
      pc += 1;
      continue;
    }

    const operandBytes = prgRom.slice(pc + 1, pc + entry.size);
    const address = `$${pc.toString(16).padStart(4, '0')}`;
    const mnemonic = entry.mnemonic;
    const operand = formatOperand(entry.mode, operandBytes);
    const description = describeInstruction(mnemonic);

    output.push(`${address}: ${mnemonic} ${operand} — ${description}`);
    pc += entry.size;
  }

  return output.join('\n');
}

// Formats operands based on addressing mode
function formatOperand(mode, bytes) {
  const byteToHex = (b) => `$${b.toString(16).padStart(2, '0')}`;
  const wordToHex = (lo, hi) => `$${((hi << 8) | lo).toString(16).padStart(4, '0')}`;

  switch (mode) {
    case "immediate":
      return `#${byteToHex(bytes[0])}`;
    case "zeroPage":
      return byteToHex(bytes[0]);
    case "absolute":
      return wordToHex(bytes[0], bytes[1]);
    case "relative":
      return byteToHex(bytes[0]); // could also compute PC-relative target
    case "indirect":
      return `(${wordToHex(bytes[0], bytes[1])})`;
    case "indirectX":
      return `(${byteToHex(bytes[0])},X)`;
    case "indirectY":
      return `(${byteToHex(bytes[0])}),Y`;
    case "zeroPageX":
      return `${byteToHex(bytes[0])},X`;
    case "zeroPageY":
      return `${byteToHex(bytes[0])},Y`;
    case "absoluteX":
      return `${wordToHex(bytes[0], bytes[1])},X`;
    case "absoluteY":
      return `${wordToHex(bytes[0], bytes[1])},Y`;
    case "accumulator":
      return "A";
    case "implied":
    default:
      return "";
  }
}

// Short text descriptions for common mnemonics
function describeInstruction(mnemonic) {
  const descMap = {
    BRK: "Break — causes an interrupt",
    LDA: "Load Accumulator with memory",
    STA: "Store Accumulator into memory",
    TAX: "Transfer Accumulator to X",
    INX: "Increment X register",
    DEX: "Decrement X register",
    JMP: "Jump to new location",
    JSR: "Jump to subroutine",
    RTS: "Return from subroutine",
    NOP: "No operation",
    BEQ: "Branch if Equal",
    BNE: "Branch if Not Equal",
    BPL: "Branch if Positive",
    BMI: "Branch if Minus",
    CLC: "Clear Carry",
    SEC: "Set Carry",
    ADC: "Add with Carry",
    SBC: "Subtract with Carry",
    CMP: "Compare Accumulator",
    AND: "Logical AND",
    ORA: "Logical OR",
    EOR: "Exclusive OR",
    LDY: "Load Y Register",
    LDX: "Load X Register",
    RTI: "Return from interrupt",
    PHA: "Push Accumulator",
    PLA: "Pull Accumulator",
    BIT: "Test bits in memory",
    ASL: "Arithmetic Shift Left",
    LSR: "Logical Shift Right",
    ROL: "Rotate Left",
    ROR: "Rotate Right",
  };

  return descMap[mnemonic] || "Unknown instruction behavior";
}

function parseNES(arrayBuff) {
  const data = new Uint8Array(arrayBuff);

  // Validate NES header
  const NES_MAGIC = [0x4E, 0x45, 0x53, 0x1A]; // "NES\x1A"
  for (let i = 0; i < NES_MAGIC.length; i++) {
    if (data[i] !== NES_MAGIC[i]) {
      return { type: "error", error: "Invalid NES header." };
    }
  }

  let currentByteRead = 4;

  // ROM sizes
  const prgRomSize = data[currentByteRead++] * 16384;
  const chrRomSize = data[currentByteRead++] * 8192;

  // Flags and Mapper
  const flags6 = data[currentByteRead++];
  const flags7 = data[currentByteRead++];
  const mapperLow = flags6 >> 4;
  const mapperHigh = flags7 >> 4;
  const mapper = (mapperHigh << 4) | mapperLow;

  const hasTrainer = (flags6 & 0x04) !== 0;
  const mirroring = (flags6 & 0x01) ? "vertical" : "horizontal";
  const batteryBacked = (flags6 & 0x02) !== 0;
  const fourScreen = (flags6 & 0x08) !== 0;

  // Skip unused header bytes
  currentByteRead += 8; // skip bytes 8-15 (flags 8-15, padding)

  const trainerOffset = hasTrainer ? 512 : 0;
  const prgStart = 16 + trainerOffset;
  const chrStart = prgStart + prgRomSize;

  const trainerData = hasTrainer ? data.slice(16, 16 + 512) : null;
  const prgRom = data.slice(prgStart, prgStart + prgRomSize);
  const chrRom = data.slice(chrStart, chrStart + chrRomSize);

  return {
    type: "success",
    header: {
      prgRomSize,
      chrRomSize,
      mapper,
      hasTrainer,
      mirroring,
      batteryBacked,
      fourScreen
    },
    rom: {
      prg: prgRom,
      chr: chrRom,
      trainer: trainerData
    }
  };
}
