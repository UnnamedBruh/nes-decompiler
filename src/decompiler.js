// All of this is written by AI; I don't guarantee any complete accuracy on any part of this snippet.

const OPCODES = {
  0x00: {"mnemonic": "BRK", "mode": "Implied", "bytes": 1},
  0x01: {"mnemonic": "ORA", "mode": "Indirect,X", "bytes": 2},
  0x05: {"mnemonic": "ORA", "mode": "Zero Page", "bytes": 2},
  0x06: {"mnemonic": "ASL", "mode": "Zero Page", "bytes": 2},
  0x08: {"mnemonic": "PHP", "mode": "Implied", "bytes": 1},
  0x09: {"mnemonic": "ORA", "mode": "Immediate", "bytes": 2},
  0x0A: {"mnemonic": "ASL", "mode": "Accumulator", "bytes": 1},
  0x0D: {"mnemonic": "ORA", "mode": "Absolute", "bytes": 3},
  0x0E: {"mnemonic": "ASL", "mode": "Absolute", "bytes": 3},
  0x10: {"mnemonic": "BPL", "mode": "Relative", "bytes": 2},
  0x11: {"mnemonic": "ORA", "mode": "Indirect,Y", "bytes": 2},
  0x15: {"mnemonic": "ORA", "mode": "Zero Page,X", "bytes": 2},
  0x16: {"mnemonic": "ASL", "mode": "Zero Page,X", "bytes": 2},
  0x18: {"mnemonic": "CLC", "mode": "Implied", "bytes": 1},
  0x19: {"mnemonic": "ORA", "mode": "Absolute,Y", "bytes": 3},
  0x1D: {"mnemonic": "ORA", "mode": "Absolute,X", "bytes": 3},
  0x1E: {"mnemonic": "ASL", "mode": "Absolute,X", "bytes": 3},
  0x20: {"mnemonic": "JSR", "mode": "Absolute", "bytes": 3},
  0x21: {"mnemonic": "AND", "mode": "Indirect,X", "bytes": 2},
  0x24: {"mnemonic": "BIT", "mode": "Zero Page", "bytes": 2},
  0x25: {"mnemonic": "AND", "mode": "Zero Page", "bytes": 2},
  0x26: {"mnemonic": "ROL", "mode": "Zero Page", "bytes": 2},
  0x28: {"mnemonic": "PLP", "mode": "Implied", "bytes": 1},
  0x29: {"mnemonic": "AND", "mode": "Immediate", "bytes": 2},
  0x2A: {"mnemonic": "ROL", "mode": "Accumulator", "bytes": 1},
  0x2C: {"mnemonic": "BIT", "mode": "Absolute", "bytes": 3},
  0x2D: {"mnemonic": "AND", "mode": "Absolute", "bytes": 3},
  0x2E: {"mnemonic": "ROL", "mode": "Absolute", "bytes": 3},
  0x30: {"mnemonic": "BMI", "mode": "Relative", "bytes": 2},
  0x31: {"mnemonic": "AND", "mode": "Indirect,Y", "bytes": 2},
  0x35: {"mnemonic": "AND", "mode": "Zero Page,X", "bytes": 2},
  0x36: {"mnemonic": "ROL", "mode": "Zero Page,X", "bytes": 2},
  0x38: {"mnemonic": "SEC", "mode": "Implied", "bytes": 1},
  0x39: {"mnemonic": "AND", "mode": "Absolute,Y", "bytes": 3},
  0x3D: {"mnemonic": "AND", "mode": "Absolute,X", "bytes": 3},
  0x3E: {"mnemonic": "ROL", "mode": "Absolute,X", "bytes": 3},
  0x40: {"mnemonic": "RTI", "mode": "Implied", "bytes": 1},
  0x41: {"mnemonic": "EOR", "mode": "Indirect,X", "bytes": 2},
  0x45: {"mnemonic": "EOR", "mode": "Zero Page", "bytes": 2},
  0x46: {"mnemonic": "LSR", "mode": "Zero Page", "bytes": 2},
  0x48: {"mnemonic": "PHA", "mode": "Implied", "bytes": 1},
  0x49: {"mnemonic": "EOR", "mode": "Immediate", "bytes": 2},
  0x4A: {"mnemonic": "LSR", "mode": "Accumulator", "bytes": 1},
  0x4C: {"mnemonic": "JMP", "mode": "Absolute", "bytes": 3},
  0x4D: {"mnemonic": "EOR", "mode": "Absolute", "bytes": 3},
  0x4E: {"mnemonic": "LSR", "mode": "Absolute", "bytes": 3},
  0x50: {"mnemonic": "BVC", "mode": "Relative", "bytes": 2},
  0x51: {"mnemonic": "EOR", "mode": "Indirect,Y", "bytes": 2},
  0x55: {"mnemonic": "EOR", "mode": "Zero Page,X", "bytes": 2},
  0x56: {"mnemonic": "LSR", "mode": "Zero Page,X", "bytes": 2},
  0x58: {"mnemonic": "CLI", "mode": "Implied", "bytes": 1},
  0x59: {"mnemonic": "EOR", "mode": "Absolute,Y", "bytes": 3},
  0x5D: {"mnemonic": "EOR", "mode": "Absolute,X", "bytes": 3},
  0x5E: {"mnemonic": "LSR", "mode": "Absolute,X", "bytes": 3},
  0x60: {"mnemonic": "RTS", "mode": "Implied", "bytes": 1},
  0x61: {"mnemonic": "ADC", "mode": "Indirect,X", "bytes": 2},
  0x65: {"mnemonic": "ADC", "mode": "Zero Page", "bytes": 2},
  0x66: {"mnemonic": "ROR", "mode": "Zero Page", "bytes": 2},
  0x68: {"mnemonic": "PLA", "mode": "Implied", "bytes": 1},
  0x69: {"mnemonic": "ADC", "mode": "Immediate", "bytes": 2},
  0x6A: {"mnemonic": "ROR", "mode": "Accumulator", "bytes": 1},
  0x6C: {"mnemonic": "JMP", "mode": "Indirect", "bytes": 3},
  0x6D: {"mnemonic": "ADC", "mode": "Absolute", "bytes": 3},
  0x6E: {"mnemonic": "ROR", "mode": "Absolute", "bytes": 3},
  0x70: {"mnemonic": "BVS", "mode": "Relative", "bytes": 2},
  0x71: {"mnemonic": "ADC", "mode": "Indirect,Y", "bytes": 2},
  0x75: {"mnemonic": "ADC", "mode": "Zero Page,X", "bytes": 2},
  0x76: {"mnemonic": "ROR", "mode": "Zero Page,X", "bytes": 2},
  0x78: {"mnemonic": "SEI", "mode": "Implied", "bytes": 1},
  0x79: {"mnemonic": "ADC", "mode": "Absolute,Y", "bytes": 3},
  0x7D: {"mnemonic": "ADC", "mode": "Absolute,X", "bytes": 3},
  0x7E: {"mnemonic": "ROR", "mode": "Absolute,X", "bytes": 3},
  0x81: {"mnemonic": "STA", "mode": "Indirect,X", "bytes": 2},
  0x84: {"mnemonic": "STY", "mode": "Zero Page", "bytes": 2},
  0x85: {"mnemonic": "STA", "mode": "Zero Page", "bytes": 2},
  0x86: {"mnemonic": "STX", "mode": "Zero Page", "bytes": 2},
  0x88: {"mnemonic": "DEY", "mode": "Implied", "bytes": 1},
  0x8A: {"mnemonic": "TXA", "mode": "Implied", "bytes": 1},
  0x8C: {"mnemonic": "STY", "mode": "Absolute", "bytes": 3},
  0x8D: {"mnemonic": "STA", "mode": "Absolute", "bytes": 3},
  0x8E: {"mnemonic": "STX", "mode": "Absolute", "bytes": 3},
  0x90: {"mnemonic": "BCC", "mode": "Relative", "bytes": 2},
  0x91: {"mnemonic": "STA", "mode": "Indirect,Y", "bytes": 2},
  0x94: {"mnemonic": "STY", "mode": "Zero Page,X", "bytes": 2},
  0x95: {"mnemonic": "STA", "mode": "Zero Page,X", "bytes": 2},
  0x96: {"mnemonic": "STX", "mode": "Zero Page,Y", "bytes": 2},
  0x98: {"mnemonic": "TYA", "mode": "Implied", "bytes": 1},
  0x99: {"mnemonic": "STA", "mode": "Absolute,Y", "bytes": 3},
  0x9A: {"mnemonic": "TXS", "mode": "Implied", "bytes": 1},
  0x9D: {"mnemonic": "STA", "mode": "Absolute,X", "bytes": 3},
  0xA0: {"mnemonic": "LDY", "mode": "Immediate", "bytes": 2},
  0xA1: {"mnemonic": "LDA", "mode": "Indirect,X", "bytes": 2},
  0xA2: {"mnemonic": "LDX", "mode": "Immediate", "bytes": 2},
  0xA4: {"mnemonic": "LDY", "mode": "Zero Page", "bytes": 2},
  0xA5: {"mnemonic": "LDA", "mode": "Zero Page", "bytes": 2},
  0xA6: {"mnemonic": "LDX", "mode": "Zero Page", "bytes": 2},
  0xA8: {"mnemonic": "TAY", "mode": "Implied", "bytes": 1},
  0xA9: {"mnemonic": "LDA", "mode": "Immediate", "bytes": 2},
  0xAA: {"mnemonic": "TAX", "mode": "Implied", "bytes": 1},
  0xAC: {"mnemonic": "LDY", "mode": "Absolute", "bytes": 3},
  0xAD: {"mnemonic": "LDA", "mode": "Absolute", "bytes": 3},
  0xAE: {"mnemonic": "LDX", "mode": "Absolute", "bytes": 3},
  0xB0: {"mnemonic": "BCS", "mode": "Relative", "bytes": 2},
  0xB1: {"mnemonic": "LDA", "mode": "Indirect,Y", "bytes": 2},
  0xB4: {"mnemonic": "LDY", "mode": "Zero Page,X", "bytes": 2},
  0xB5: {"mnemonic": "LDA", "mode": "Zero Page,X", "bytes": 2},
  0xB6: {"mnemonic": "LDX", "mode": "Zero Page,Y", "bytes": 2},
  0xB8: {"mnemonic": "CLV", "mode": "Implied", "bytes": 1},
  0xB9: {"mnemonic": "LDA", "mode": "Absolute,Y", "bytes": 3},
  0xBA: {"mnemonic": "TSX", "mode": "Implied", "bytes": 1},
  0xBC: {"mnemonic": "LDY", "mode": "Absolute,X", "bytes": 3},
  0xBD: {"mnemonic": "LDA", "mode": "Absolute,X", "bytes": 3},
  0xBE: {"mnemonic": "LDX", "mode": "Absolute,Y", "bytes": 3},
  0xC0: {"mnemonic": "CPY", "mode": "Immediate", "bytes": 2},
  0xC1: {"mnemonic": "CMP", "mode": "Indirect,X", "bytes": 2},
  0xC4: {"mnemonic": "CPY", "mode": "Zero Page", "bytes": 2},
  0xC5: {"mnemonic": "CMP", "mode": "Zero Page", "bytes": 2},
  0xC6: {"mnemonic": "DEC", "mode": "Zero Page", "bytes": 2},
  0xC8: {"mnemonic": "INY", "mode": "Implied", "bytes": 1},
  0xC9: {"mnemonic": "CMP", "mode": "Immediate", "bytes": 2},
  0xCA: {"mnemonic": "DEX", "mode": "Implied", "bytes": 1},
  0xCC: {"mnemonic": "CPY", "mode": "Absolute", "bytes": 3},
  0xCD: {"mnemonic": "CMP", "mode": "Absolute", "bytes": 3},
  0xCE: {"mnemonic": "DEC", "mode": "Absolute", "bytes": 3},
  0xD0: {"mnemonic": "BNE", "mode": "Relative", "bytes": 2},
  0xD1: {"mnemonic": "CMP", "mode": "Indirect,Y", "bytes": 2},
  0xD5: {"mnemonic": "CMP", "mode": "Zero Page,X", "bytes": 2},
  0xD6: {"mnemonic": "DEC", "mode": "Zero Page,X", "bytes": 2},
  0xD8: {"mnemonic": "CLD", "mode": "Implied", "bytes": 1},
  0xD9: {"mnemonic": "CMP", "mode": "Absolute,Y", "bytes": 3},
  0xDD: {"mnemonic": "CMP", "mode": "Absolute,X", "bytes": 3},
  0xDE: {"mnemonic": "DEC", "mode": "Absolute,X", "bytes": 3},
  0xE0: {"mnemonic": "CPX", "mode": "Immediate", "bytes": 2},
  0xE1: {"mnemonic": "SBC", "mode": "Indirect,X", "bytes": 2},
  0xE4: {"mnemonic": "CPX", "mode": "Zero Page", "bytes": 2},
  0xE5: {"mnemonic": "SBC", "mode": "Zero Page", "bytes": 2},
  0xE6: {"mnemonic": "INC", "mode": "Zero Page", "bytes": 2},
  0xE8: {"mnemonic": "INX", "mode": "Implied", "bytes": 1},
  0xE9: {"mnemonic": "SBC", "mode": "Immediate", "bytes": 2},
  0xEA: {"mnemonic": "NOP", "mode": "Implied", "bytes": 1},
  0xEC: {"mnemonic": "CPX", "mode": "Absolute", "bytes": 3},
  0xED: {"mnemonic": "SBC", "mode": "Absolute", "bytes": 3},
  0xEE: {"mnemonic": "INC", "mode": "Absolute", "bytes": 3},
  0xF0: {"mnemonic": "BEQ", "mode": "Relative", "bytes": 2},
  0xF1: {"mnemonic": "SBC", "mode": "Indirect,Y", "bytes": 2},
  0xF5: {"mnemonic": "SBC", "mode": "Zero Page,X", "bytes": 2},
  0xF6: {"mnemonic": "INC", "mode": "Zero Page,X", "bytes": 2},
  0xF8: {"mnemonic": "SED", "mode": "Implied", "bytes": 1},
  0xF9: {"mnemonic": "SBC", "mode": "Absolute,Y", "bytes": 3},
  0xFD: {"mnemonic": "SBC", "mode": "Absolute,X", "bytes": 3},
  0xFE: {"mnemonic": "INC", "mode": "Absolute,X", "bytes": 3},

  0x03: {"mnemonic": "SLO", "mode": "Indirect,X", "bytes": 2},
  0x07: {"mnemonic": "SLO", "mode": "Zero Page", "bytes": 2},
  0x0B: {"mnemonic": "ANC", "mode": "Immediate", "bytes": 2},
  0x0F: {"mnemonic": "SLO", "mode": "Absolute", "bytes": 3},
  0x13: {"mnemonic": "SLO", "mode": "Indirect,Y", "bytes": 2},
  0x17: {"mnemonic": "SLO", "mode": "Zero Page,X", "bytes": 2},
  0x1B: {"mnemonic": "SLO", "mode": "Absolute,Y", "bytes": 3},
  0x1F: {"mnemonic": "SLO", "mode": "Absolute,X", "bytes": 3},

  0x23: {"mnemonic": "RLA", "mode": "Indirect,X", "bytes": 2},
  0x27: {"mnemonic": "RLA", "mode": "Zero Page", "bytes": 2},
  0x2B: {"mnemonic": "ANC", "mode": "Immediate", "bytes": 2},
  0x2F: {"mnemonic": "RLA", "mode": "Absolute", "bytes": 3},
  0x33: {"mnemonic": "RLA", "mode": "Indirect,Y", "bytes": 2},
  0x37: {"mnemonic": "RLA", "mode": "Zero Page,X", "bytes": 2},
  0x3B: {"mnemonic": "RLA", "mode": "Absolute,Y", "bytes": 3},
  0x3F: {"mnemonic": "RLA", "mode": "Absolute,X", "bytes": 3},

  0x43: {"mnemonic": "SRE", "mode": "Indirect,X", "bytes": 2},
  0x47: {"mnemonic": "SRE", "mode": "Zero Page", "bytes": 2},
  0x4B: {"mnemonic": "ALR", "mode": "Immediate", "bytes": 2},
  0x4F: {"mnemonic": "SRE", "mode": "Absolute", "bytes": 3},
  0x53: {"mnemonic": "SRE", "mode": "Indirect,Y", "bytes": 2},
  0x57: {"mnemonic": "SRE", "mode": "Zero Page,X", "bytes": 2},
  0x5B: {"mnemonic": "SRE", "mode": "Absolute,Y", "bytes": 3},
  0x5F: {"mnemonic": "SRE", "mode": "Absolute,X", "bytes": 3},

  0x63: {"mnemonic": "RRA", "mode": "Indirect,X", "bytes": 2},
  0x67: {"mnemonic": "RRA", "mode": "Zero Page", "bytes": 2},
  0x6B: {"mnemonic": "ARR", "mode": "Immediate", "bytes": 2},
  0x6F: {"mnemonic": "RRA", "mode": "Absolute", "bytes": 3},
  0x73: {"mnemonic": "RRA", "mode": "Indirect,Y", "bytes": 2},
  0x77: {"mnemonic": "RRA", "mode": "Zero Page,X", "bytes": 2},
  0x7B: {"mnemonic": "RRA", "mode": "Absolute,Y", "bytes": 3},
  0x7F: {"mnemonic": "RRA", "mode": "Absolute,X", "bytes": 3},

  0x80: {"mnemonic": "NOP", "mode": "Immediate", "bytes": 2},
  0x82: {"mnemonic": "NOP", "mode": "Immediate", "bytes": 2},
  0x89: {"mnemonic": "NOP", "mode": "Immediate", "bytes": 2},
  0xC2: {"mnemonic": "NOP", "mode": "Immediate", "bytes": 2},
  0xE2: {"mnemonic": "NOP", "mode": "Immediate", "bytes": 2},
  0xEB: {"mnemonic": "SBC", "mode": "Immediate", "bytes": 2},

  0x87: {"mnemonic": "SAX", "mode": "Zero Page", "bytes": 2},
  0x97: {"mnemonic": "SAX", "mode": "Zero Page,Y", "bytes": 2},
  0x8F: {"mnemonic": "SAX", "mode": "Absolute", "bytes": 3},

  0xA3: {"mnemonic": "LAX", "mode": "Indirect,X", "bytes": 2},
  0xA7: {"mnemonic": "LAX", "mode": "Zero Page", "bytes": 2},
  0xAF: {"mnemonic": "LAX", "mode": "Absolute", "bytes": 3},
  0xB3: {"mnemonic": "LAX", "mode": "Indirect,Y", "bytes": 2},
  0xB7: {"mnemonic": "LAX", "mode": "Zero Page,Y", "bytes": 2},

  0xBF: {"mnemonic": "LAX", "mode": "Absolute,Y", "bytes": 3},

  0xCB: {"mnemonic": "AXS", "mode": "Immediate", "bytes": 2},

  0xC3: {"mnemonic": "DCP", "mode": "Indirect,X", "bytes": 2},
  0xC7: {"mnemonic": "DCP", "mode": "Zero Page", "bytes": 2},
  0xCF: {"mnemonic": "DCP", "mode": "Absolute", "bytes": 3},
  0xD3: {"mnemonic": "DCP", "mode": "Indirect,Y", "bytes": 2},
  0xD7: {"mnemonic": "DCP", "mode": "Zero Page,X", "bytes": 2},
  0xDB: {"mnemonic": "DCP", "mode": "Absolute,Y", "bytes": 3},
  0xDF: {"mnemonic": "DCP", "mode": "Absolute,X", "bytes": 3},

  0xE3: {"mnemonic": "ISC", "mode": "Indirect,X", "bytes": 2},
  0xE7: {"mnemonic": "ISC", "mode": "Zero Page", "bytes": 2},
  0xEF: {"mnemonic": "ISC", "mode": "Absolute", "bytes": 3},
  0xF3: {"mnemonic": "ISC", "mode": "Indirect,Y", "bytes": 2},
  0xF7: {"mnemonic": "ISC", "mode": "Zero Page,X", "bytes": 2},
  0xFB: {"mnemonic": "ISC", "mode": "Absolute,Y", "bytes": 3},
  0xFF: {"mnemonic": "ISC", "mode": "Absolute,X", "bytes": 3}
}

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
    const operand = formatOperand(entry.mode, operandBytes, pc);
    const description = describeInstruction(mnemonic);

    output.push(`${address}: ${mnemonic} ${operand} — ${description}`);
    pc += entry.size;
  }

  return output.join('\n');
}

// Formats operands based on addressing mode
function formatOperand(mode, bytes, pc) {
  const byteToHex = (b) => `$${b.toString(16).padStart(2, '0')}`;
  const wordToHex = (lo, hi) => `$${((hi << 8) | lo).toString(16).padStart(4, '0')}`;

  switch (mode) {
    case "Immediate":
      return `#${byteToHex(bytes[0])}`;
    case "Zero Page":
      return byteToHex(bytes[0]);
    case "Absolute":
      return wordToHex(bytes[0], bytes[1]);
    case "Relative":
      const offset = bytes[0] < 0x80 ? bytes[0] : bytes[0] - 0x100; // signed byte
      const target = pc + 2 + offset;
      return `$${target.toString(16).padStart(4, '0')}`;
    case "Indirect":
      return `(${wordToHex(bytes[0], bytes[1])})`;
    case "Indirect,X":
      return `(${byteToHex(bytes[0])},X)`;
    case "Indirect,Y":
      return `(${byteToHex(bytes[0])}),Y`;
    case "Zero Page,X":
      return `${byteToHex(bytes[0])},X`;
    case "Zero Page,Y":
      return `${byteToHex(bytes[0])},Y`;
    case "Absolute,X":
      return `${wordToHex(bytes[0], bytes[1])},X`;
    case "Absolute,Y":
      return `${wordToHex(bytes[0], bytes[1])},Y`;
    case "Accumulator":
      return "A";
    case "Implied":
    default:
      return "";
  }
}

// Short text descriptions for common mnemonics
function describeInstruction(mnemonic) {
  const descMap = {
  "BRK": "Break — causes an interrupt",
  "LDA": "Load Accumulator with memory",
  "STA": "Store Accumulator into memory",
  "TAX": "Transfer Accumulator to X",
  "INX": "Increment X register",
  "DEX": "Decrement X register",
  "JMP": "Jump to new location",
  "JSR": "Jump to subroutine",
  "RTS": "Return from subroutine",
  "NOP": "No operation",
  "BEQ": "Branch if Equal",
  "BNE": "Branch if Not Equal",
  "BPL": "Branch if Positive",
  "BMI": "Branch if Minus",
  "CLC": "Clear Carry",
  "SEC": "Set Carry",
  "ADC": "Add with Carry",
  "SBC": "Subtract with Carry",
  "CMP": "Compare Accumulator",
  "AND": "Logical AND",
  "ORA": "Logical OR",
  "EOR": "Exclusive OR",
  "LDY": "Load Y Register",
  "LDX": "Load X Register",
  "RTI": "Return from interrupt",
  "PHA": "Push Accumulator",
  "PLA": "Pull Accumulator",
  "BIT": "Test bits in memory",
  "ASL": "Arithmetic Shift Left",
  "LSR": "Logical Shift Right",
  "ROL": "Rotate Left",
  "ROR": "Rotate Right",
  "STX": "Store X Register into memory",
  "STY": "Store Y Register into memory",
  "TXA": "Transfer X to Accumulator",
  "TYA": "Transfer Y to Accumulator",
  "TXS": "Transfer X to Stack Pointer",
  "TSX": "Transfer Stack Pointer to X",
  "TAY": "Transfer Accumulator to Y",
  "INY": "Increment Y Register",
  "DEY": "Decrement Y Register",
  "CPX": "Compare X Register",
  "CPY": "Compare Y Register",
  "DEC": "Decrement memory",
  "INC": "Increment memory",
  "CLD": "Clear Decimal Mode",
  "SED": "Set Decimal Mode",
  "CLI": "Clear Interrupt Disable",
  "SEI": "Set Interrupt Disable",
  "CLV": "Clear Overflow Flag",
  "PHP": "Push Processor Status",
  "PLP": "Pull Processor Status",
  "LAX": "Load Accumulator and X with memory",
  "SAX": "Store A & X (bitwise AND) into memory",
  "DCP": "Decrement memory, then compare with A",
  "ISC": "Increment memory, then SBC with A",
  "SLO": "ASL memory, then ORA with A",
  "RLA": "ROL memory, then AND with A",
  "SRE": "LSR memory, then EOR with A",
  "RRA": "ROR memory, then ADC with A",
  "ANC": "AND A with immediate, then move bit 7 to Carry",
  "ALR": "AND A with immediate, then LSR",
  "ARR": "AND A with immediate, then ROR (affects flags oddly)",
  "AXS": "AND A and X, store result in X"
}

  return descMap[mnemonic] || "Unknown instruction behavior";
}

function decodeChrTiles(chrRom) {
  const tiles = [];
  const tileCount = Math.floor(chrRom.length / 16);

  for (let t = 0; t < tileCount; t++) {
    const tile = new Uint8Array(256);
    const base = t * 16;

    for (let row = 0; row < 8; row++) {
      const plane0 = chrRom[base + row];
      const plane1 = chrRom[base + row + 8];
      for (let col = 0; col < 8; col++) {
        // bits are read MSB to LSB left to right
        const bit0 = (plane0 >> (7 - col)) & 1;
        const bit1 = (plane1 >> (7 - col)) & 1;
        tile[row * 8 + col] = bit0 | (bit1 << 1); // combine bits into 0-3 color index
      }
    }

    tiles.push(tile);
  }

  return tiles;
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

  const machineCode = disassemble6502(prgRom);
  const tiles = decodeChrTiles(chrRom);

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
      trainer: trainerData,
      machineCode,
      tiles
    }
  };
}
