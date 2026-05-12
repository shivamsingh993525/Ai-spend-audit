import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: Request) {

  try {

    const body = await req.json()

    console.log('BODY:', body)

    const { data, error } = await supabase
      .from('leads')
      .insert([body])
      .select()

    if (error) {

      console.log('SUPABASE ERROR:', error)

      return NextResponse.json({
        success: false,
        error
      })

    }

    console.log('SUCCESS:', data)

    return NextResponse.json({
      success: true,
      data
    })

  } catch (err) {

    console.log('SERVER ERROR:', err)

    return NextResponse.json({
      success: false
    })

  }

}