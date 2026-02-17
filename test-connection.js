import { supabase } from './lib/supabase';

/**
 * Comprehensive Database Connection Test
 * This script verifies all aspects of the Supabase configuration
 */

console.log('🚀 Learnova - Supabase Connection Test\n');
console.log('='.repeat(50));

async function runTests() {
    const results = {
        passed: 0,
        failed: 0,
        warnings: 0,
    };

    // Test 1: Environment Variables
    console.log('\n📋 Test 1: Environment Variables');
    console.log('-'.repeat(50));

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

    if (supabaseUrl && supabaseUrl.includes('supabase.co')) {
        console.log('✅ VITE_SUPABASE_URL:', supabaseUrl);
        results.passed++;
    } else {
        console.log('❌ VITE_SUPABASE_URL: Missing or invalid');
        results.failed++;
    }

    if (supabaseKey && supabaseKey.length > 20) {
        console.log('✅ VITE_SUPABASE_ANON_KEY: Set (length:', supabaseKey.length, ')');
        results.passed++;
    } else {
        console.log('❌ VITE_SUPABASE_ANON_KEY: Missing or invalid');
        results.failed++;
    }

    if (stripeKey) {
        console.log('✅ VITE_STRIPE_PUBLISHABLE_KEY: Set');
        results.passed++;
    } else {
        console.log('⚠️  VITE_STRIPE_PUBLISHABLE_KEY: Not set (optional for testing)');
        results.warnings++;
    }

    // Test 2: Supabase Client Initialization
    console.log('\n🔌 Test 2: Supabase Client');
    console.log('-'.repeat(50));

    try {
        if (supabase) {
            console.log('✅ Supabase client initialized successfully');
            results.passed++;
        }
    } catch (error) {
        console.log('❌ Supabase client initialization failed:', error.message);
        results.failed++;
        return results;
    }

    // Test 3: Database Connection
    console.log('\n💾 Test 3: Database Connection');
    console.log('-'.repeat(50));

    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('count')
            .limit(0);

        if (error) {
            if (error.message.includes('relation') && error.message.includes('does not exist')) {
                console.log('⚠️  Database tables not found - migrations may not be applied yet');
                console.log('   Run migrations from Supabase dashboard or CLI');
                results.warnings++;
            } else if (error.message.includes('JWT')) {
                console.log('⚠️  Authentication issue - check your ANON_KEY');
                console.log('   Error:', error.message);
                results.warnings++;
            } else {
                console.log('❌ Database connection error:', error.message);
                results.failed++;
            }
        } else {
            console.log('✅ Database connection successful');
            results.passed++;
        }
    } catch (error) {
        console.log('❌ Database connection failed:', error.message);
        results.failed++;
    }

    // Test 4: Table Access
    console.log('\n📊 Test 4: Table Access (RLS Check)');
    console.log('-'.repeat(50));

    const tables = [
        'profiles',
        'courses',
        'lessons',
        'enrollments',
        'lesson_progress',
        'payments',
        'forum_posts',
        'forum_comments',
        'achievements',
        'user_achievements',
        'notifications'
    ];

    for (const table of tables) {
        try {
            const { error } = await supabase
                .from(table)
                .select('count')
                .limit(0);

            if (error) {
                if (error.message.includes('relation') && error.message.includes('does not exist')) {
                    console.log(`⚠️  ${table.padEnd(20)} - Table not found (run migrations)`);
                    results.warnings++;
                } else {
                    console.log(`❌ ${table.padEnd(20)} - Error: ${error.message}`);
                    results.failed++;
                }
            } else {
                console.log(`✅ ${table.padEnd(20)} - Accessible`);
                results.passed++;
            }
        } catch (error) {
            console.log(`❌ ${table.padEnd(20)} - Exception: ${error.message}`);
            results.failed++;
        }
    }

    // Test 5: Authentication Status
    console.log('\n🔐 Test 5: Authentication');
    console.log('-'.repeat(50));

    try {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
            console.log('❌ Auth check failed:', error.message);
            results.failed++;
        } else if (session) {
            console.log('✅ User authenticated');
            console.log('   User ID:', session.user.id);
            console.log('   Email:', session.user.email);
            results.passed++;
        } else {
            console.log('ℹ️  No active session (user not logged in - this is normal)');
            console.log('✅ Auth system is working');
            results.passed++;
        }
    } catch (error) {
        console.log('❌ Auth check exception:', error.message);
        results.failed++;
    }

    // Test 6: Storage Buckets
    console.log('\n📁 Test 6: Storage Buckets');
    console.log('-'.repeat(50));

    try {
        const { data: buckets, error } = await supabase.storage.listBuckets();

        if (error) {
            console.log('⚠️  Could not list storage buckets:', error.message);
            results.warnings++;
        } else {
            const expectedBuckets = ['course-thumbnails', 'course-videos', 'certificates', 'avatars'];
            const foundBuckets = buckets.map(b => b.name);

            for (const bucket of expectedBuckets) {
                if (foundBuckets.includes(bucket)) {
                    console.log(`✅ ${bucket.padEnd(20)} - Found`);
                    results.passed++;
                } else {
                    console.log(`⚠️  ${bucket.padEnd(20)} - Not found (run storage setup)`);
                    results.warnings++;
                }
            }
        }
    } catch (error) {
        console.log('⚠️  Storage check exception:', error.message);
        results.warnings++;
    }

    return results;
}

// Run all tests
runTests().then(results => {
    console.log('\n' + '='.repeat(50));
    console.log('📈 Test Results Summary');
    console.log('='.repeat(50));
    console.log(`✅ Passed:   ${results.passed}`);
    console.log(`❌ Failed:   ${results.failed}`);
    console.log(`⚠️  Warnings: ${results.warnings}`);
    console.log('='.repeat(50));

    if (results.failed === 0 && results.warnings === 0) {
        console.log('\n🎉 Perfect! Your Supabase backend is fully configured!');
        console.log('   You can start building your application features.');
    } else if (results.failed === 0) {
        console.log('\n✅ Connection successful with some warnings.');
        console.log('   Review warnings above - you may need to:');
        console.log('   1. Run database migrations');
        console.log('   2. Set up storage buckets');
        console.log('   3. Configure optional features');
    } else {
        console.log('\n⚠️  Some tests failed. Please check:');
        console.log('   1. Your .env file has correct credentials');
        console.log('   2. Your Supabase project is active');
        console.log('   3. You have run the database migrations');
        console.log('   4. Network connectivity to Supabase');
        console.log('\n📚 See SUPABASE_SETUP.md for detailed setup instructions');
    }

    console.log('\n');
}).catch(error => {
    console.error('\n❌ Test suite failed:', error);
    console.log('\n📚 See SUPABASE_SETUP.md for troubleshooting');
});
