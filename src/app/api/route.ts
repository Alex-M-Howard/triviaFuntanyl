import { NextRequest, NextResponse } from "next/server";

const NUMBER_OF_QUESTIONS: Number = 15;
const BASE_API_URL: String = 'https://opentdb.com/api.php';

type Options = {
    category: number,
    difficulty: string,
    type: string
}

// * This route will get the number of TOTAL questions in all categories.
// TODO Should there be logic to keep track of what is left and change # of questions?
export async function GET(req: NextRequest, res: NextResponse){
  
  
  const response = await fetch('https://opentdb.com/api_count_global.php')
  const data = await response.json();

  return NextResponse.json(data);
}

// * This route will receive 'category', 'difficulty', and 'type', will return questions
// TODO Maybe default category should be missing so that it gets all categories
export async function POST(req: NextRequest, res: NextResponse){
    const options: Options = await req.json();
    const params = { ...options, amount: NUMBER_OF_QUESTIONS }
    
    const url: URL = new URL(`${BASE_API_URL}`);

    for(let query in params){ url.searchParams.append(query, params[query]); }
    
    
    const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
     
      return NextResponse.json(data);
}
