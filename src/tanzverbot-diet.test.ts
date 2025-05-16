import { calcDateOnDiet, Sex } from "./tanzverbot-diet";

describe('calcDateOnDiet', () => {
  it('should calculate days to gain weight for a male with valid inputs', () => {
    const days = calcDateOnDiet(60, 65, 1.75, 25, Sex.Male);
    expect(typeof days).toBe('number');
    expect(days).toBeGreaterThan(0);
  });

  it('should calculate days to gain weight for a female with valid inputs', () => {
    const days = calcDateOnDiet(50, 53, 1.65, 22, Sex.Female);
    expect(typeof days).toBe('number');
    expect(days).toBeGreaterThan(0);
  });

  it('should throw error if target weight is less than current weight', () => {
    expect(() => {
      calcDateOnDiet(70, 65, 1.8, 30, Sex.Male);
    }).toThrow('This diet is for gaining weight, not loosing it!');
  });

  it('should throw error if age is under 16', () => {
    expect(() => {
      calcDateOnDiet(50, 55, 1.7, 15, Sex.Female);
    }).toThrow('You do not qualify for this kind of diet.');
  });

  it('should throw error if height is under 1.5m', () => {
    expect(() => {
      calcDateOnDiet(50, 55, 1.49, 20, Sex.Female);
    }).toThrow('You do not qualify for this kind of diet.');
  });

  it('should NOT throw error if diet is extremely high in calories', () => {
    expect(() => {
      calcDateOnDiet(30, 35, 2.5, 18, Sex.Male);
    }).not.toThrow();
  });

  it('should work correctly with exact boundary values (age = 16, height = 1.5)', () => {
    const days = calcDateOnDiet(45, 48, 1.5, 16, Sex.Female);
    expect(typeof days).toBe('number');
    expect(days).toBeGreaterThan(0);
  });

  it('should return the same result for same inputs consistently', () => {
    const result1 = calcDateOnDiet(55, 58, 1.65, 20, Sex.Female);
    const result2 = calcDateOnDiet(55, 58, 1.65, 20, Sex.Female);
    expect(result1).toBe(result2);
  });
});

test("Tanzverbot Diet", () => {
  expect(calcDateOnDiet(74, 100, 1.86, 38, Sex.Male)).toBeGreaterThan(0);
});
