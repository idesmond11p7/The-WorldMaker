import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'project_records.json');

function ensureDataFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    const initialData = {
      system: 'Lorekeeper / Worldmaker Studio',
      lastUpdated: new Date().toISOString(),
      customDossiers: [],
      sessionNotes: []
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
  }
}

export async function GET() {
  try {
    ensureDataFile();
    const content = fs.readFileSync(DATA_FILE, 'utf-8');
    return NextResponse.json(JSON.parse(content));
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read records' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    ensureDataFile();
    const body = await req.json();
    const current = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    const updated = {
      ...current,
      ...body,
      lastUpdated: new Date().toISOString()
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(updated, null, 2), 'utf-8');
    return NextResponse.json({ success: true, updated });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update records' }, { status: 500 });
  }
}
